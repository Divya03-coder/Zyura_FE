# Zyura Project Architecture (Frontend + Backend)

## Project overview

Zyura is a split full-stack application built as two separate repositories. The backend repository `zyura-backend` is a TypeScript Express server with MongoDB, Socket.IO, Swagger documentation, and a modular REST API architecture. The frontend repository `zyura-frontend` is a React application built with Vite, TypeScript, Redux Toolkit, RTK Query, React Router, and role-based UI flows for students, mentors, and admins. The two repos relate through a shared API contract: the frontend sends authenticated requests to backend routes under `/api`, while the backend exposes data, file uploads, real-time tracking, AI generation, and payment endpoints consumed by the frontend.

## Backend entrypoint and initialization

The backend entrypoint is `zyura-backend/src/server.ts`. This file first imports the Express app from `src/app.ts`, then builds an HTTP server around it. It creates a Socket.IO server instance and configures CORS for local development at `http://localhost:5173`, and it wires the socket instance into `src/socket.ts` through `setupSocket(io)`. The entrypoint then connects to MongoDB using `mongoose.connect` with retry, timeout, and pooling options, registers listeners for disconnect, reconnect, and error events, and finally starts listening on the configured port. Only after the server is successfully listening does it call `makeDefaultAdmin()`, ensuring the application is ready before seeding admin data. The order is strict: create HTTP server, attach Express app, attach Socket.IO, set up socket handlers, connect the database, then start listening and seed default admin.

## app.ts middleware, routing, and error handling

The core Express app is defined in `zyura-backend/src/app.ts`. It creates the `app` object, configures Swagger with `swaggerJsdoc` and `swagger-ui-express`, and mounts it at `/docs`. It applies CORS to allow requests from local development hosts and production domains, then registers body parsers in this order: `express.json({ limit: "100mb" })`, `express.raw()`, `cookieParser()`, and `express.urlencoded({ extended: true })`. This order ensures JSON payloads are parsed first, raw bodies are available for special upload or webhook flows, cookies are parsed for auth, and URL-encoded forms are handled last. The app registers its main router at `/api` using `appRouter` from `src/routes.ts`, defines a health check at `/`, and then attaches error handling. The error middleware order is critical: `globalErrorHandler` is registered first, and then the `notFound` handler runs after routes if no route matched.

## configs/index.ts environment variables

The backend configuration module at `zyura-backend/src/app/configs/index.ts` exposes every environment variable used by the server. It exports `port` and `env`, and a `jwt` object containing `ACCESS_TOKEN`, `REFRESH_TOKEN`, `ACCESS_EXPIRES`, `REFRESH_EXPIRES`, `RESET_SECRET`, `RESET_EXPIRES`, `FRONT_END_URL`, and `VERIFIED_TOKEN`. It exposes `db_url` for the MongoDB connection. It also exposes `email` configuration with `APP_USER`, `APP_PASSWORD`, and `SENDGRID_API_KEY`. For media uploads it exposes Cloudinary settings `CLOUD_NAME`, `CLOUD_API_KEY`, and `CLOUD_API_SECRET`. It exposes an `admin` object with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. For AWS it exposes `AWS_ACCESS_KEY_ID`, `AWS_ACCESS_KEY_SECRET`, `AWS_REGION_NAME`, and `AWS_BUCKET_NAME`. It exposes `AI_API` for integrated AI services. For payment gateway integration it exposes multiple gateway variables, including `AFS_GATEWAY_URL`, `AFS_MERCHANT_ID`, `AFS_API_PASSWORD`, `MERCHANT_NAME`, `MASTERCARD_GATEWAY_URL`, `MASTERCARD_MERCHANT_ID`, `MASTERCARD_API_PASSWORD`, `MASTERCARD_API_VERSION`, `MERCHANT_ID`, `MERCHANT_PASSWORD`, `MERCHANT_URL`, `DEFAULT_CURRENCY`, `CHECKOUT_RETURN_URL`, `REDIRECT_MERCHANT_URL`, and `RETRY_ATTEMPT_COUNT`. Finally, it exposes mailgun/SMTP variables as `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM`.

## routes.ts and request flow

The backend route registry is `zyura-backend/src/routes.ts`. It registers every module under a specific prefix and maps that prefix to a module folder. The prefixes are `/sessions`, `/group`, `/group_message`, `/tracking`, `/payment`, `/analytics`, `/mentor`, `/my_content`, `/study_planner`, `/ai_part`, `/goal`, `/web_setting`, `/events`, `/faq`, `/pricing_plan`, `/resource`, `/osce`, `/aws`, `/notes`, `/profile_type_const`, `/report`, `/exam`, `/study_mode_tree`, `/auth`, `/clinical-case`, `/student`, `/social-post`, `/career-resource`, `/flash-card`, `/mcq-bank`, and `/admin`. A request arrives at `app.ts`, is forwarded to `/api`, enters `routes.ts`, and is routed to the corresponding module router such as `src/app/modules/auth/auth.route.ts` or `src/app/modules/clinical_case/clinical_case.route.ts`. The router then executes any configured middleware, passes validation through `RequestValidator` if present, and forwards the request to the feature controller.

## backend module structure pattern

Every backend feature module follows a consistent organization pattern. The module folder contains a router file, a controller file, a validation file that uses Zod, and a model or schema file. The router file, such as `clinical_case.route.ts`, imports `RequestValidator`, `auth`, `uploader` where needed, and the module controller. It sets route paths, attaches auth guards with roles, and applies validation. The validation file defines Zod schemas used by `RequestValidator`, which parses `req.body` and passes validation errors to the error handler. The controller file contains the business logic and interacts with models, and the model schema file defines the MongoDB document structure. New features must follow this pattern: module router, Zod validation + `RequestValidator`, controller, model/schema, and registration in `routes.ts`.

## global_error_handler.ts details

The global error handler in `zyura-backend/src/app/middlewares/global_error_handler.ts` is the final error catch-all. It checks for `ZodError` first and converts it to a `400 Validation Error` with an array of `errorSources` that include each field and message. It next checks for `ValidationError`, `CastError`, and duplicate key errors from MongoDB, each handled by a dedicated helper. It then checks for custom `AppError` instances and preserves that status and message. If the error is a generic `Error`, it returns the message with a `500` fallback status. The response always includes `success: false`, `message`, `errorSources`, and `err`; the stack trace is included only when `configs.env === 'development'`.

## socket.ts realtime and tracking

The realtime socket logic lives in `zyura-backend/src/socket.ts`. When a new connection arrives, it reads `socket.handshake.query.token` and verifies it with `jwtHelpers.verifyToken` using `configs.jwt.access_token`. If verification succeeds, it stores the socket in the `onlineUsers` map keyed by the account ID. It also ensures the daily goal bucket exists by checking `goal_model` and resetting `todayStudyHours` if the date changed. When the socket disconnects, it calculates elapsed hours, updates `goal_model.totalCompletedStudyHours`, and then calculates `afterTodayHours` and `afterTodayMcqHours` or `afterTodayClinicalCaseHours` or `afterTodayOsceHours`. It writes these updates back to the active goal record and updates streaks if the daily target is reached. The three activity types it tracks for daily goals are `mcq`, `clinical_case`, and `osce`. It also emits presence and optional `streak` events to connected clients.

## frontend entrypoint and wrappers

The frontend entrypoint is `zyura-frontend/src/main.tsx`. The component tree is wrapped in this exact order: first `<Provider store={store}>` so Redux is available to every component; second `<PersistGate loading={null} persistor={persistor}>` so persisted Redux state is rehydrated before rendering; third `<RouterProvider router={routes} />` so route matching happens after the store is ready; and finally `<Toaster richColors position="top-right" />` to render notifications globally. That order matters because route guards and auth-dependent components rely on Redux state, and the router must wait on persisted auth state to avoid flashing protected pages. The toaster is outside route rendering so notifications work across the whole app.

## Routes.tsx and route groups

`zyura-frontend/src/routes/Routes.tsx` is the master route registry. It combines `homeRoutes`, `dashboardRoutes`, `mentorRoutes`, `adminRoutes`, and `authRoutes`. It also defines two special direct routes: `/unauthorized` for access-denied handling and `checkout/success` for payment success completion, and it defines a fallback `*` route to show the `NotFound` page. This file therefore centralizes the entire client-side routing structure.

## PrivateRoute.tsx logic

`zyura-frontend/src/routes/PrivateRoute.tsx` reads the current user from Redux using `selectUser` from `auth.slice.ts`. If there is no user in Redux, it redirects the browser to `/login` and preserves the attempted location in `state.from`. If the route specifies `allowedRoles` and the current user role is not included, it redirects to `/unauthorized`. This hook enforces the distinction that `STUDENT` and `PROFESSIONAL` share dashboard routes, while `MENTOR` uses its own mentor route set and admin pages are separated in `AdminRoutes.tsx`.

## HomeRoutes.tsx

`zyura-frontend/src/routes/HomeRoutes.tsx` defines the public marketing routes. It uses the public app layout component `App` and renders `Home` at `/`, `Pricing` at `/pricing`, and `DrugSearchCard` at `/drug-search`. These pages are accessible to unauthenticated users and serve as the application entry points for marketing, pricing, and drug lookup.

## AuthRoutes.tsx

`zyura-frontend/src/routes/AuthRoutes.tsx` defines the authentication workflow pages. It includes login, signup, verification OTP, set password, multi-step register, forgot password, and reset password. These pages are public and are the only routes used before a user is authenticated.

## DashboardRoutes.tsx

`zyura-frontend/src/routes/DashboardRoutes.tsx` defines the student and professional dashboard area. It wraps the child routes in `PrivateRoute` with allowed roles `STUDENT` and `PROFESSIONAL` and uses `DashboardLayout`. It includes dashboard home, progress, community event, mentorship pages, mentor profile and booking pages, AI tutor, MCQ bank and practice pages, quiz generator, clinical case generator and detail pages, bio-digital explorer, courses, gamified learning, daily challenges, OSCE pages, download notes, create notes, flashcard pages, career resources, study planning, drug search and drug card pages, student profile editing, settings, help, and various support pages. Every page in this group is protected, and both `STUDENT` and `PROFESSIONAL` may access them.

## MentorRoutes.tsx

`zyura-frontend/src/routes/MentorRoutes.tsx` defines mentor-specific routes. It wraps routes in `PrivateRoute` with `MENTOR` only and uses `MentorLayout`. It includes mentor dashboard, question bank creation, classes, session details, materials, earnings, mentor settings, mentor community, forum details, recent transactions, mentor profile, and review pages. This route group is exclusive to mentors.

## AdminRoutes.tsx

`zyura-frontend/src/routes/AdminRoutes.tsx` defines admin pages under `AdminLayout`. It includes the admin dashboard, student/professional/mentor lists, individual profile pages, content management, resource management, transactions, event creation, plan creation, support center, FAQ, settings, and URL copy pages. While these routes are not wrapped in `PrivateRoute` within this file, they are intended for admin users and use the admin layout shell.

## store.ts details

`zyura-frontend/src/store/store.ts` configures the Redux store. It includes `baseAPI.reducer` for the core RTK Query API, `bioDigitalExternalAPI.reducer` for the external BioDigital API, `drugApi.reducer` for drug search APIs, `auth` persisted reducer for authentication state, `staticContent` persisted reducer for static selection state, and `quiz` reducer for quiz-specific state. The middleware chain includes default middleware with serializable checks disabled for Redux Persist actions, followed by `baseAPI.middleware`, `bioDigitalExternalAPI.middleware`, and `drugApi.middleware`. The store persists auth state and static content selections so login and filter context survive refreshes.

## auth.slice.ts details

`zyura-frontend/src/store/features/auth/auth.slice.ts` defines auth state with `user` and `accessToken`, both nullable. It exports actions `setUser` and `logout`. `setUser` stores the authenticated user object and access token, while `logout` clears both values. It exports selectors `selectUser` and `selectToken`. The frontend must use these selectors for auth logic instead of reading raw cookies or local storage directly; `PrivateRoute` and API middleware depend on Redux state for current session state.

## baseApi.ts and its importance

`zyura-frontend/src/store/api/baseApi.ts` is the primary API layer. It uses `createApi` with a base URL from `import.meta.env.VITE_API_URL`. It sends credentials on every request and attaches the access token from the `accessToken` cookie as `authorization`. It wraps the base query to detect authorization failures: if a response is `401`, if the backend returns a JWT expiry message, or if the error name is `TokenExpiredError`, it clears local storage, removes `accessToken` and `refreshToken` cookies, dispatches `logout()`, shows a toast error, and redirects to `/login`. It also shows success toasts for non-GET writes and error toasts for failures. No other `createApi` instance should be created in the frontend except the existing `bioDigitalExternalAPI` and `drugApi`. All new API endpoints should be added to `baseAPI.injectEndpoints` from feature slices.

### cache tags in baseApi.ts

The tags cover data domains used by the frontend and include `Student`, `Professional`, `professionalsProfile`, `Mentor`, `mentorsProfile`, `Forum`, `Questions`, `SocialPost`, `Mcq`, `SingleMcq`, `StudyModeTree`, `Exams`, `studentType`, `FlashCard`, `Notes`, `ClinicalCase`, `OSCE`, `PricePlan`, `Goal`, `AITutor`, `Faq`, `Event`, `ResourceCarrier`, `ResourceBooks`, `StudyPlan`, `WebSetting`, `ReportResponse`, `professionalType`, `BioDigital`, `payment`, `GeneratedMCQ`, `GeneratedNotes`, `GeneratedFlashcard`, `GeneratedClinicalCase`, `Group`, `GroupMessage`, `Transaction`, `Tracking`, `Leaderboard`, `Sessions`, `AllExam`, `AllExamForProfessional`, and `DailyChallenge`. These tags represent cached resources for list pages, detail pages, generated content, goals, events, payments, and tracking.

## frontend folder structure and responsibilities

`src/common/` houses reusable UI controls and small helpers that are used across views. `src/components/` contains higher-level reusable blocks, including student dashboard components, admin framework pieces, and mentor community widgets. `src/pages/` contains route-level page components for each route group. `src/Layout/` contains the role-specific layout shells for public, dashboard, mentor, and admin interfaces. `src/store/` contains Redux store setup, feature slices, and RTK Query endpoints. `src/types/` contains shared TypeScript models. `src/services/` contains service integration helpers and external API wrappers. `src/utils/` contains pure utility functions and helper logic.

## page-to-endpoint mapping summary

The student MCQ bank and practice pages call `/mcq-bank` and `/study_mode_tree/all`, and they interact with the `Mcq` and `Goal` tags. The quiz generator pages use `/ai_part/generate-mcq` and list generated quizzes from `/my_content/mcqs`, using the `GeneratedMCQ` tag. Clinical case pages call `/clinical-case` and `/my_content/clinical-case`, using `ClinicalCase` and `GeneratedClinicalCase`. Flashcard pages call `/flash-card`, `/ai_part/generate-flashcard`, and `/my_content/flashcard`, using `FlashCard` and `GeneratedFlashcard`. Notes pages call `/notes/all`, `/notes/download/:noteId`, `/notes/single/:id`, `/ai_part/generate-note`, and `/my_content/notes`, using `Notes` and `GeneratedNotes`. Study planner pages call `/ai_part/create-study-plan`, `/study_planner/all`, `/study_planner/:id`, `/study_planner/save-progress`, and `/study_planner/delete/:id`, using `StudyPlan`. OSCE pages call `/osce` and update progress through `/goal/update-progress-osce`, using `OSCE` and `Goal`. Mentor community pages use social post endpoints and mentor forum endpoints, tagging `Forum`, `SocialPost`, `Sessions`, and `Transaction`. Career resources use `/resource/career`. Profile and settings use `/auth/me`, `/auth/update-initial-profile`, `/auth/update-profiles`, and `/web_setting`, with `WebSetting` for settings. Admin dashboard pages use `/admin/*` overview endpoints and event management under `/events`, tagging `Event`. The pricing page uses `/pricing_plan`. Payment and checkout use `/payment/initiate` and `/payment/verify`. AWS file uploads use `/aws/upload-single-image`. The drug search page uses the `drugApi` slice for external drug APIs.

## example flows

A note deletion flow begins in the generated notes UI, where `useDeleteMyContentMutation()` sends a DELETE request to `/my_content/delete/:id/notes`. The request enters `routes.ts`, goes to `my_content.route.ts`, and the controller deletes the record. After success, the frontend invalidates `GeneratedNotes`, causing any note list query to refetch and immediately update the UI.

A daily study tracking flow begins when the frontend opens a Socket.IO connection with the JWT token in the query. The backend verifies that token in `socket.ts`, stores the socket in `onlineUsers`, and on disconnect computes the session duration. It updates `goal_model` with `todayStudyHours`, `totalCompletedStudyHours`, and the specific `mcq`, `clinical_case`, or `osce` counter, and updates streak fields when a daily target is reached. No polling is used; Socket.IO is the only mechanism for this tracking.

## contributor rules

Never modify any file outside the frontend routing and architecture layer unless the task explicitly requires it. When adding a new frontend page, always register it in the correct route group file with `PrivateRoute` and the correct role set. When adding a new frontend API endpoint, always extend `baseAPI` through a feature slice, declare `providesTags` and `invalidatesTags`, and do not create a new `createApi` instance except for the existing `bioDigitalExternalAPI` and `drugApi`. When adding a new backend module, always register it in `routes.ts`, always use `RequestValidator` with a Zod schema, always throw typed application errors, and always read configuration from `configs/index.ts`. Never introduce polling for study tracking; Socket.IO is the only allowed mechanism. Always keep Swagger documentation at `/docs` up to date when backend routes change.



Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/middlewares/auth.ts#1-1), lines 1 to 50

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/social_post/social_post.route.ts#1-1), lines 1 to 50

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/social_post/social_post.controller.ts#1-1), lines 1 to 100

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/social_post/social_post.service.ts#1-1), lines 1 to 100

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/mentor/mentor.route.ts#1-1), lines 1 to 50

Searched for text `forum`, 20 results

Searched for text `ForumPostModel`, 7 results

Searched for text `forum`, 20 results

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/store/features/mentor-dashboard/forum/forum.api.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/social_post/social_post.route.ts#1-1), lines 1 to 100

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/notes/notes.route.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/notes/notes.service.ts#1-1), lines 1 to 50

Searched for text `get_all_notes`, 6 results

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/notes/notes.service.ts#79-79), lines 79 to 150

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/clinical_case/clinical_case.route.ts#1-1), lines 1 to 50

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/clinical_case/clinical_case.route.ts#40-40), lines 40 to 85

Searched for text `get_all_clinical_case`, 6 results

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/clinical_case/clinical_case.service.ts#307-307), lines 307 to 380

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/mcq_bank/mcq_bank.route.ts#1-1), lines 1 to 50

Searched for text `get_all_mcq_banks`, 12 results

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/mcq_bank/mcq_bank.service.ts#137-137), lines 137 to 200

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/my_content/my_content.route.ts#1-1), lines 1 to 50

Searched for text `get_all_my_generated_mcq`, 6 results

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/my_content/my_content.service.ts#11-11), lines 11 to 50

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/events/events.route.ts#1-1), lines 1 to 50

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/career_resource/career_resource.route.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/resource/resource.route.ts#1-1), lines 1 to 50

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/osce/osce.route.ts)

एक Student role (जिसका role "STUDENT" है) के लिए Zyura project में access और data visibility का पूरा breakdown नीचे है। मैंने backend routes, controllers, और services को analyze करके यह तय किया है। Students और Professionals दोनों dashboard routes share करते हैं, लेकिन data filtering role-based है।

### **Student का Access (क्या Pages/Features मिलते हैं):**
Students को ये सब मिलता है (DashboardRoutes.tsx से):
- **Dashboard Home**: Progress overview, stats.
- **Progress Page**: Study tracking, goals.
- **Community Events**: Events देखना, enroll करना।
- **Mentorship**: Mentor profiles देखना, booking करना।
- **AI Tutor**: AI से help.
- **MCQ Bank & Practice**: MCQs practice करना, quiz generate करना।
- **Clinical Case Generator & Details**: Cases देखना, generate करना।
- **Bio-Digital Explorer**: Interactive content.
- **Courses**: Study courses.
- **Gamified Learning**: Challenges, badges.
- **Daily Challenges**: Daily tasks.
- **OSCE Pages**: OSCE practice.
- **Download Notes**: Admin-uploaded notes download.
- **Create Notes**: Manual notes बनाना।
- **Flashcard Pages**: Flashcards देखना, generate करना।
- **Career Resources**: Resources देखना।
- **Study Planning**: Plans बनाना, track करना।
- **Drug Search & Drug Card**: External drug APIs से search.
- **Profile Editing**: अपना profile update.
- **Settings**: App settings.
- **Help**: Support pages.

**Public Pages** (कोई भी बिना login के देख सकता, लेकिन students logged in हैं):
- Home, Pricing, Drug Search.

**Auth Pages**: Login, Signup, OTP, etc. (लेकिन ये logged in users के लिए नहीं)।

**Mentor/Forum Access**: Students forum details देख सकते हैं, create new discussion कर सकते हैं (DashboardRoutes में)।

**Admin Access**: नहीं मिलता।

### **Student को कौन सा Data दिखता है (Data Visibility):**
Backend में role-based filtering है। Students को सिर्फ "student" content दिखता है, और उनका profileType (जैसे MBBS, Nursing) के basis पर filter होता है। Goal-based filtering भी apply होती है (active goal के topics के basis पर)।

- **Notes (/notes/all)**: सिर्फ contentFor="student" और student के profileType से match करने वाले notes। (Admin upload करता है, professionals नहीं post कर सकते)।
- **Clinical Cases (/clinical-case)**: सिर्फ contentFor="student" और profileType match। (Admin create, लेकिन PROFESSIONAL update कर सकते हैं, तो अगर कोई professional case update करे तो students देख सकते हैं अगर filter match)।
- **MCQ Bank (/mcq-bank)**: सिर्फ contentFor="student" और profileType match।
- **Flashcard**: Similar filtering (अगर flashcard module भी ऐसा है)।
- **OSCE (/osce)**: सभी OSCEs (कोई filter नहीं)।
- **Career Resources (/resource/career)**: सभी (public)।
- **Events (/events)**: सभी events। Students enroll कर सकते हैं और "my-events" देख सकते हैं।
- **Social Posts (/social-post)**: सभी posts (कोई role filter नहीं)। सभी users के posts दिखते हैं – अगर कोई professional post करे तो students देख सकते हैं।
- **Forum Posts (/social-post/forum)**: सभी forum posts। Students create, comment कर सकते हैं।
- **Questions (/social-post/question)**: Students post कर सकते हैं, और mentors के answers देख सकते हैं (MENTOR role वाले answer देते हैं)।
- **My Content (/my_content)**: सिर्फ अपना generated content (MCQs, flashcards, clinical cases, notes)। दूसरे users का नहीं।
- **Mentors (/mentor)**: सभी mentors की profiles, sessions book कर सकते हैं।
- **Professionals**: Community में उनके posts दिखते हैं (social/forum)। Direct professional data नहीं, लेकिन अगर कोई professional social post करे तो visible।
- **Pricing (/pricing_plan)**: सभी plans।
- **Drug Search**: External API से data (कोई filter नहीं)।
- **Goals & Tracking**: अपना ही data (Socket.IO से real-time tracking)।
- **Settings (/web_setting)**: सभी settings (public)।

### **Student क्या Functionalities कर सकता है (Actions/Interactions):**
- **Generate Content**: AI से MCQs, flashcards, clinical cases, notes generate करना।
- **Practice & Track**: MCQs practice, progress track, daily goals update (Socket.IO से auto-track)।
- **Study Planning**: Plans create, progress save।
- **Community Interaction**: Social posts create, react, comment। Forum posts create, comment। Questions post (mentors answer देंगे)।
- **Mentorship**: Mentor book करना, sessions देखना।
- **Events**: Enroll करना, my-events देखना।
- **Profile Management**: Update profile, settings change।
- **Download/Upload**: Notes download, drug search।
- **AI Help**: Tutor use करना।
- **Gamification**: Challenges complete करना।
- **OSCE Practice**: OSCEs practice करना, progress update।
- **Drug Search**: External APIs use करना।

### **अगर कोई Professional Data Post/Share करे तो क्या होता है?**
- **Social/Forum Posts**: Professionals post कर सकते हैं (auth allows), students देख सकते हैं और interact (comment, react) कर सकते हैं।
- **Clinical Cases**: Professionals update कर सकते हैं (routes allow), तो अगर कोई professional case add/update करे और वो student के filter (contentFor="student", profileType match) में आए तो visible। Students view कर सकते हैं, लेकिन edit नहीं।
- **Questions**: Professionals questions post कर सकते हैं, students देख सकते हैं और mentors answers देख सकते हैं।
- **Events**: Professionals events create नहीं कर सकते (only ADMIN/MENTOR), लेकिन अगर कोई event हो तो students देख सकते हैं।
- **Notes/MCQs**: ये admin-only create हैं, professionals post नहीं कर सकते, तो students सिर्फ admin-uploaded data देखते हैं।
- **My Content**: Professionals का generated content students नहीं देख सकते (filter by accountId)।
- **Community**: Professionals के posts public हैं, students interact कर सकते हैं।

**Summary**: Students को broad access है study tools पर, लेकिन data role-filtered है (सिर्फ student-relevant)। Professionals के shared content (social, forum, clinical cases) visible है अगर filter match, और students interact कर सकते हैं। No admin/mentor exclusive data access। Socket.IO tracking सभी activities के लिए auto है।

Finding the exact filter logic for student content based on profile type and `contentFor`.

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/student/student.schema.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/notes/notes.service.ts#90-90), lines 90 to 140

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/mcq_bank/mcq_bank.service.ts#140-140), lines 140 to 180

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/clinical_case/clinical_case.service.ts#330-330), lines 330 to 360

Content visible karne ka logic backend me yahi hai:

- `profile_type` account-level category hota hai:
  - `student_profile` / `professional_profile` / `mentor_profile` / `admin_profile`
- `role` determine karta hai ki user STUDENT hai ya PROFESSIONAL

Student ke liye actual content filtering `student_profile` document ke `studentType` field pe hoti hai, na ki `profile_type` pe.

Example:
- user account ka `role: "STUDENT"`
- account me `profile_type: "student_profile"`
- student profile document me `studentType` ho sakta hai `"Medical Student"` ya `"Dental Student"` etc.

Backend code me content fetch karte waqt:
- `filters.contentFor = "student"`
- `filters.profileType = student?.studentType`

Iska matlab:
- sirf wahi content dikhega jiska:
  - `contentFor` = `"student"`
  - aur `profileType` = student ke `studentType` ke same value

Isi tarah:
- professional ke liye:
  - `filters.contentFor = "professional"`
  - `filters.profileType = professional?.professionName`

Toh short me:
- `profile_type` sirf account category hai
- `studentType` decide karta hai:
  - medical student ko kya dikhega
  - dental student ko kya dikhega

Agar tum chahte ho ki medical student ko bhi dental content dikhe, toh backend me ya database me content item ka `profileType` match hona chahiye, ya filter logic change karna padega.

Yeh rule use hota hai Notes / MCQ / Clinical Case / Flashcard / OSCE etc. sab me.

Checking how `profile_type` is used for access and data filtering.

Searched for regex `profile_type|profileType` (`**/zyura-backend/src/**/*.{ts,js}`), 200 results

Isme `profile_type` student account ke liye `student_profile` hi hona chahiye.

Important point:
- `profile_type` account ka user category batata hai: `student_profile`, `professional_profile`, `mentor_profile`, `admin_profile`.
- agar account ka role `STUDENT` hai, to `profile_type` ko `student_profile` hi rehna chahiye.

`profile_type` ko change karke student ko admin/professional access nahi milta. Access logic backend me alag hoti hai:
- study content (`notes`, `mcq`, `clinical_case`, etc.) filter hota hai `contentFor` aur `profileType` se,
- student ke liye `contentFor="student"` aur `profileType` student ke selected subject/type se match hona chahiye,
- professional ke liye `contentFor="professional"` aur professional ke profession se match hona chahiye.

Matlab:
- agar koi professional data share karta hai aur woh `contentFor: "student"` aur student ke profileType se match kare, to student dekh payega.
- par sirf `profile_type` ko `professional_profile` ya `admin_profile` karne se student ka role nahi badlega aur woh sahi tarah se behave karega hi nahi.

Summary:
- ye account student hai => `profile_type: "student_profile"` hi sahi hai.
- admin/professional data agar student ko visible karna hai to backend/content ko student-targeted hona chahiye, na ki student account ka `profile_type` badalna.


Checking the student signup data model so I can answer exactly how signup should map to fields.

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/student/student.interface.ts)

Searched for regex `signup|register|create student|student profile|student_type|studentType` (`**/zyura-backend/src/**/*.{ts,js}`), 71 results

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.validation.ts)

Haan, bilkul — agar tum chahte ho ki student ko correct content dikhe, to signup/registration flow me student-specific details lena zaruri hai.

Important cheezen:

1. student.interface.ts jo fields define karta hai, wo student profile document ke liye hain, not just account login.
   - `accountId`
   - `firstName`
   - `lastName`
   - `studentType`  ← bahut important, yahi decide karega kya content dikhega (Medical Student / Dental Student / etc.)
   - `phone`
   - `country`
   - `university`
   - `preparingFor`
   - `bio`
   - `year_of_study`
   - `profile_photo`
   - `preference`

2. Current auth register validation sirf email/password leta hai.
   - auth.validation.ts me `register_validation` me sirf `email` aur `password` required hain.
   - Iska matlab: first signup sirf account banata hai.

3. Uske baad student profile create/update hona chahiye:
   - aapko signup ke baad ya signup ke during ek extra step banana chahiye
   - jisme studentType, university, year_of_study, preparingFor, profile_photo, etc. collect ho
   - phir ye data backend me `student_profile` document me save ho

4. Content filtering backend me `studentType` use karta hai:
   - notes, mcq, clinical cases, flashcard, osce, tracking sab me `filters.profileType = student?.studentType`
   - student ko dikhega wahi content jiska `contentFor="student"` aur `profileType` unke `studentType` se match kare

Toh answer:
- `signup` ko thik karna padega, par sirf email/password se kaam nahi chalega.
- student.interface.ts ke fields se hi content matching sahi hoga.
- isliye sign up flow me student details lena + student profile document banana zaruri hai.

Agar tum chaho, to mai bata sakta hoon exactly kaunsa endpoint ya form step add karna chahiye abhi project me.



---------------------------------------------------------------------------------------------

I'm researching the student role-based access control and MCQ flow in your codebase.   

Searched for regex `auth\("STUDENT"\)|role.*STUDENT|STUDENT.*role` (`**/zyura-backend/src/**/*.ts`), 33 results

Searched for regex `mcq.*student|student.*mcq|MCQ.*create|mcq_bank.*route` (`**/zyura-backend/src/**/*.ts`), 56 results

Searched for files matching `**/mcq*route* **/mcq*service* **/mcq*controller*`, no matches

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/mcq_bank/mcq_bank.route.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/mcq_bank/mcq_bank.service.ts#140-140), lines 140 to 300

Based on your codebase, here's a detailed explanation in Hinglish:

## **STUDENT ROLE-BASED ACCESS CONTROL (RBAC)**

### **1. Student Kaise Authentication Hoti Hai?**
```
Auth Middleware → auth("STUDENT") →
Email + Password Verify → 
Account Check → Student Profile Link → 
JWT Token Issue → Dashboard Access
```

### **2. Student Ke Permissions (क्या कर सकता है)**

| Feature | Can Do | Cannot Do |
|---------|--------|----------|
| **MCQ Dekh सकता है** | ✅ Apni profile type ke MCQs dekh sakta hai | ❌ Doosri profile type ke MCQs nahi |
| **MCQ Attempt करना** | ✅ Quiz solve kar sakta hai + marks record hoga | ❌ MCQ upload/create nahi kar sakta |
| **Progress Track करना** | ✅ Leaderboard dekh sakta hai, points check kar sakta | ❌ Dusre ka data edit nahi kar sakta |
| **Notes & Flashcard** | ✅ AI se generate kar sakta hai (AI credits use करके) | ❌ Admin content edit nahi kar sakta |
| **Exam Create करना** | ✅ Apna personal exam ownself banate hai bulk/manual दोनों तरह से | ❌ Official exams nahi create kar sakta |

---

## **STUDENT KA MCQ FLOW (विस्तृत)**

### **Phase 1️⃣: MCQ DEKHNAA (कोई भी MCQ देखने से पहले)**

```
Student Login →
Profile Type Check (Medical/Dental/etc) →
Role-Based Filter लगता है:
  - contentFor = "student" (ये fixed है)
  - profileType = "Medical Student" या "Dental Student" (जो profile में save है)
  
उसके बाद ही MCQs दिखता है!
```

**Code से समझो:**
```typescript
// Backend के अंदर
if (req?.user?.role === "STUDENT") {
  const student = await Student_Model.findOne({...});
  filters.contentFor = "student";
  filters.profileType = student?.studentType; // Medical/Dental वगैरह
}

// अब सिर्फ ये MCQs दिखेंगे जिनमें:
// contentFor: "student" 
// profileType: "Medical Student"
```

---

### **Phase 2️⃣: MCQ ATTEMPT करना (Quiz solve करना)**

**Student जब MCQ attempt करता है:**

1. **MCQ Bank से Question खोला**
   - Single MCQ or Full Set
   - Difficulty level filter कर सकता है (Easy/Medium/Hard)
   - Search term लगा सकता है

2. **Answer दिया और Save किया**
   - Backend को लग जाता है कि ये student ने ये MCQ attempt किया
   - Marks calculate होते हैं
   - finishedMcqBankIds में add होता है (_id store होता है)
   - Profile Type based progress update होती है

**Code:**
```typescript
// Report save होता है
filters.profileType = student?.studentType;
// आप का answer vs correct answer compare होता है
// Points add होते हैं
```

---

### **Phase 3️⃣: EXAM BNANA (Personal Exam बनाना)**

**Student अपनी खुद की exam बना सकता है:**

#### **तरीका 1️⃣: Bulk MCQ से (CSV upload)**
```
POST /api/exam/student/upload-exam-with-bulk-mcq
- Exam का नाम
- CSV file जिसमें MCQs हैं
- Total time (minutes में)
```

#### **तरीका 2️⃣: Manual MCQ (एक-एक करके)**
```
POST /api/exam/student/upload-exam-with-manual-mcq
- Question text
- Options (A, B, C, D)
- Correct answer
- Marks, difficulty, etc.
```

**Student ये कर सकता है exam के साथ:**
- ✅ Exam create करना
- ✅ MCQ add करना (add-more-mcq route se)
- ✅ Specific MCQ update करना (update-mcq route se)
- ✅ MCQ delete करना (delete-specific-mcq route se)
- ❌ दूसरे का exam edit नही कर सकता

---

### **Phase 4️⃣: FILTERS & VISIBILITY**

**Student को ये filters available हैं:**

```javascript
// MCQ Bank से उसे दिखता है:
{
  title: "Anatomy Basics",           // Question title
  subject: "Anatomy",                // Subject
  system: "Musculoskeletal",         // System
  topic: "Bones",                    // Topic
  subtopic: "Vertebrae",             // Subtopic
  contentFor: "student",             // सिर्फ student के लिए
  profileType: "Medical Student",    // उसकी profile type
  totalMcq: 50,                      // कितने questions हैं
  isComplete: true/false             // क्या उसने complete किया
}
```

---

### **Phase 5️⃣: GOAL-BASED FILTERING**

अगर student का कोई **Goal** (Study Plan) active है तो:

```
Student का Goal: "USMLE Step 1 की तैयारी"
  ↓
MCQ filter हो जाती है goal के अनुसार
  ↓
सिर्फ relevant MCQs दिखते हैं
  ↓
Progress track होती है goal-wise
```

---

### **छोटा सारांश (Summary)**

| क्या देख सकता है | कैसे | Example |
|---|---|---|
| **MCQ** | Profile type के हिसाब से | Medical Student को Medical MCQs |
| **Attempt करना** | Solve करके marks पाना | Quiz खोले, answer दे, submit करे |
| **Report Generate** | हर attempt का record | "5/10 correct, 50 points" |
| **Exam Banana** | CSV या Manual method | "Anatomy Mock Exam" बना सकता है |
| **Edit करना** | Apne exam को edit/delete कर सकता | Apne data ko modify kar sakta |

**सबसे important:** 🎯 **Profile type जो register करते time दिया है वही सब कुछ determine करता है!**

---------------------------------------------------------------------------------------------
Checking backend role checks for MCQ, clinical cases, OSCE, notes and required student profile fields.

Searched for regex `contentFor = "student"|filters.contentFor = "student"|profileType = student|profileType = professional|student?.studentType|studentType` (`**/zyura-backend/src/app/modules/**/*.{ts,tsx}`), 61 results

Haan, account document se student access mil sakta hai, kyunki:

- `role: "STUDENT"`
- `profile_type: "student_profile"`
- `isVerified: true`
- `accountStatus: "ACTIVE"`

Ye basic auth check pass karta hai.

---

## Par actual content access ke liye kya chahiye?

### 1) Student profile document zaroori hai
Account ke saath `profile_id` ho gaya hai, lekin backend content filters student profile se `studentType` padhte hain.

`student_profile` collection mein jo document hona chahiye usme kam se kam ye fields hone chahiye:

- `accountId`
- `firstName`
- `lastName`
- `studentType`  ← yeh sabse important
- `country`
- `university`
- `year_of_study`
- `preparingFor`
- `bio`
- `profile_photo` (optional)

Example:
```json
{
  "accountId": "69df670957d387f7e0191d21",
  "firstName": "Divya",
  "lastName": "Singh",
  "studentType": "Medical Student",
  "country": "India",
  "university": "XYZ University",
  "year_of_study": "4th Year",
  "preparingFor": [{ "examName": "NEET PG", "description": "..." }],
  "bio": "..."
}
```

---

## 2) MCQ / Clinical case / OSCE / Notes kyun nahi dikh sakte?

Backend code me student content filter karta hai is logic se:

- `filters.contentFor = "student"`
- `filters.profileType = student?.studentType`

Same for:
- `mcq_bank`
- `clinical_case`
- `notes`
- `flash_card`
- `osce`

Toh agar `studentType` blank ho ya `profile_id` resolve nahi ho raha, toh student ke liye content nahi milega.

---

## 3) Toh kya add karna hai database me?

Agar abhi sirf account document hai, toh student profile document bhi add karo:

- `student_profile` collection me ek document jisme `accountId` = account `_id`
- `studentType` value set karo
- `profile_id` account document me already hai, lekin us linked profile document exist hona chahiye

---

## 4) Kya Google login student ko MCQ access deta hai?

Google account se agar profile create hua hai:
- toh yes, technically student access mil sakta hai
- lekin content dikhega sirf tab jab `student_profile.studentType` sahi ho

Agar Google user ka `studentType` missing ho, toh unko content nahi mil sakta.

---

## 5) Simple answer

### `YES`:
- Agar `profile_id` valid student profile document point karta hai
- Aur us profile doc me `studentType` filled hai

### `NO`:
- Agar student profile doc missing ho
- Ya `studentType` missing ho
- Ya profile doc ka `accountId` wrong ho

---

## 6) Aapko kya check karna hai

1. `student_profile` collection me profile document exist karta hai?
2. Usme `studentType` filled hai kya?
3. `profile_id` account document me correct hai?
4. Content items MCQ / clinical case / notes me `contentFor: "student"` aur `profileType` same value pe set hain?

---

## 7) Agar aap chahte ho ke student sab access kare

Sabse important:
- `role = STUDENT`
- `profile_type = student_profile`
- `profile_id` valid ho
- linked student profile me `studentType` ho

Agar ye sab hai, toh MCQ / clinical cases / OSCE / notes backend se milna chahiye.

Agar chaho toh main tumhare DB structure ke hisaab se exact `student_profile` document ka sample bhi bana deta hoon.


-----------------------------------------------------------------------------------------------------------------------
Checking the Google login flow in both frontend and backend code.

Searched for regex `Google|google|signInWithGoogle|sign-in-with-google|auth/sign-in-with-google|useSignInWithGoogleMutation` (`**/*.{ts,tsx}`), 54 results

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.service.ts#460-460), lines 460 to 570

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/pages/authPage/Login.tsx#1-1), lines 1 to 140

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/pages/authPage/Signup.tsx#1-1), lines 1 to 140

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/config/firebase.config.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.route.ts#1-1), lines 1 to 40

Google login ka flow simple hai: frontend Firebase se Google user uthata hai, phir backend ko user info bhejta hai aur backend account create/update kar ke JWT token deta hai.

## Frontend mein kya hota hai

1. **Firebase setup**
   - firebase.config.ts
   - `GoogleAuthProvider()` banaya gaya
   - `auth = getAuth(app)`

2. **Login / Signup page**
   - Login.tsx
   - Signup.tsx
   - Dono mein `signInWithPopup(auth, googleProvider)` call hota hai

3. **Google popup**
   - User Google sign-in karta hai
   - Firebase se response milta hai:
     - `user.email`
     - `user.displayName`
     - `user.photoURL`

4. **Backend ko request**
   - Frontend fire karta hai:
     - `POST /api/auth/sign-in-with-google`
   - Payload:
     - `{ email, name, photo }`

5. **Login success**
   - Backend se access token milta hai
   - Frontend cookie mein `accessToken` store karta hai
   - `useLazyGetMeQuery` se `/auth/me` fetch karta hai
   - Redux mein `setUser({ accessToken, user })` karta hai
   - Phir route redirect hota hai `/dashboard` ya role ke hisaab se

---

## Backend mein kya hota hai

1. **Route**
   - auth.route.ts
   - `authRoute.post("/sign-in-with-google", ...)`

2. **Validation**
   - auth.validation.ts
   - `sign_in_with_google` schema: `email`, `name`, `photo`

3. **Service logic**
   - auth.service.ts
   - Function: `sign_in_with_google_and_save_in_db(payload)`

4. **Account upsert**
   - Agar email existing hai:
     - update nahi karta except `setOnInsert`
   - Agar email nahi hai:
     - create karta hai new account:
       - `authType: "GOOGLE"`
       - `accountStatus: "ACTIVE"`
       - `isVerified: true`
       - `role: "STUDENT"`
       - `profile_type: "student_profile"`

5. **Profile banaana**
   - Agar `account.profile_id` nahi hai:
     - ek naya `Student_Model` create karta hai:
       - `firstName: payload.name`
       - `profile_photo: payload.photo`
       - `accountId: account._id`
     - phir account me `profile_id` update karta hai

6. **Tokens generate**
   - JWT `accessToken`
   - JWT `refreshToken`
   - Return karta hai:
     - `{ accessToken, refreshToken, role }`

---

## Iska matlab kya hai?

### Agar tumhara Google user hai:
- backend usko student account bana dega
- `role` automatically `STUDENT` ban jayega
- `profile_type` automatically `student_profile` ban jayega

### Lekin access tabhi fully work karega jab:
- `profile_id` sahi ho
- student profile document me `studentType` ho
- `contentFor="student"` aur `profileType` matching content ho

Agar sirf Google login ho gaya lekin `student_profile.studentType` missing ho, toh MCQ/clinical case/notes etc. filter logic se sahi content nahi milega.

---

## Short summary

### Google login se kya hota hai:
- Frontend: Google popup → Firebase auth → user email/name/photo milta hai
- Frontend: backend `POST /auth/sign-in-with-google`
- Backend: account create/update + student profile create (agar nahi hai)
- Backend: JWT tokens generate
- Frontend: token save + `/auth/me` call + user set in Redux

### Important
- Google login API already jo kastam bana hai, woh signup/login dono ke liye kaam karta hai.
- “Google login working” ka matlab hai user login ho jayega, par content access uske student profile details se decide hoti hai.

Agar chaho, main ab bata sakta hoon exact DB fields jo Google login ke baad `student_profile` mein add hone chahiye, taaki MCQ/notes/clinical-case access complete ho.

--------------------------------------------------------------------------------------------------
### Google login vs manual login — dono me kya fark hai

#### 1. Authentication ka source
- **Manual login**: `email + password`
  - User browser se form bhar ke bhejta hai
  - Backend `/api/auth/login` pe password verify hota hai
  - Agar correct ho to JWT token banega
- **Google login**: Google Firebase popup ke through
  - Frontend `signInWithPopup(auth, googleProvider)` chalata hai
  - Google se email/name/photo milte hain
  - Fir backend ko `POST /api/auth/sign-in-with-google` bheja jata hai

#### 2. Backend pe treatment
- **Manual login**
  - Backend `auth.service.login_user_from_db()` use karta hai
  - `Account_Model.findOne({ email })`
  - `bcrypt.compare(password, hashedPassword)`
  - fir token banata hai
- **Google login**
  - Backend `sign_in_with_google_and_save_in_db(payload)` use karta hai
  - `Account_Model.findOneAndUpdate({ email: payload.email }, { $setOnInsert: {...} }, { upsert: true, new: true })`
  - Agar user pehle se nahi tha to naya account ban jayega
  - `authType: "GOOGLE"`, `role: "STUDENT"`, `profile_type: "student_profile"` set hota hai
  - Agar profile missing ho to `Student_Model.create({ firstName, profile_photo, accountId })` bhi banata hai

#### 3. Account creation
- **Manual login**
  - Account pehle register hona chahiye
  - `register` page me email/password create hota hai
  - verification OTP step ho sakta hai
- **Google login**
  - Agar account pehle se nahi hai, to Google login automatically account create kar deta hai
  - Isliye `signup` aur `login` dono jaisa behave karta hai

#### 4. Profile data
- **Manual login**
  - Usually ek complete student profile banaya jata hai later
  - `studentType`, `university`, `year_of_study` etc. form se fill karna padta hai
- **Google login**
  - Sirf Google se `name` aur `photo` milte hain
  - Backend minimal profile create karta hai:
    - `firstName = payload.name`
    - `profile_photo = payload.photo`
  - Lekin `studentType` ya `university` automatically nahi milta
  - Isliye Google login ke baad user ko profile update karna zaroori ho sakta hai

#### 5. Token aur session
- Dono me final me same result hota hai:
  - backend accessToken banata hai
  - frontend usko cookie me save karta hai
  - `/auth/me` call karke user data fetch hota hai
  - Redux me `setUser({ accessToken, user })` hota hai

#### 6. Role-based access me difference?
- **Nahi**
  - `role: "STUDENT"` dono case me mil sakta hai
  - `profile_type: "student_profile"` bhi dono me mil sakta hai
  - Isliye MCQ/clinical case/notes access ka decision same hota hai
  - Lekin content display ke liye `student_profile.studentType` zaroori hai
    - Manual login me ye likely signup/profiles step me set hota hai
    - Google login me agar missing ho to student-specific content nahi dikhega

#### 7. Practical summary
- `Manual login`: password-based, existing account chahiye, profile fill step zaroori
- `Google login`: social auth, auto-create account, fast login, lekin profile details adhure ho sakte hain
- dono me `access token`, `role`, `profile_type` same mechanism se work karte hain

> Iska matlab: Google login convenient hai, lekin agar `studentType` ya profile details complete nahi hain to `MCQ/clinical case/notes` ka full access nahi mil paega.

Agar chaho to main bata sakta hoon ki tumhare Google login flow me `studentType` kaise set karvaye taaki study content properly dikhne lage.

--------------------------------------------------------------------------------------------------
Compacted conversationChecking the access-control logic for student content and profile-type matching.Optimizing tool selection...

Searched for regex `profileType|profile_type|studentType|contentFor|content_type|profileType` (`**/*.{ts,tsx}`), 200 results

Searched for regex `osce|flash_card|clinical_case|mcq|contentFor|profileType` (`**/*.{ts,tsx}`), 200 results

Found the important access decision point: content is matched using `contentFor` + student `profileType` from the linked profile. Now I’ll confirm the exact backend check.

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/ai_part/ai_part.service.ts#80-80), lines 80 to 110

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/middlewares/auth.ts)

## Student access ke liye kya dekhna padega

Haan, agar student ko `OSCE`, `Flashcard`, `Clinical Case` etc. access karna hai, to login / user profile me yeh check hona chahiye:

1. `role` user ka `"STUDENT"` ho
2. account ka `profile_type` `"student_profile"` ho
3. linked profile me `studentType` / `profileType` value present ho

---

## Backend me kya use hota hai

Current backend logic me student ke liye content filter isi tarah hota hai:

- `contentFor = "student"`
- `profileType = isAccount?.profile_id?.profileType` (ya `studentType`)

Yani:
- agar user `STUDENT` hai
- aur uski profile me koi specific student type hai, jaise `Medical Student`, `MBBS`, etc.
- to backend sirf wahi content return karega jiska `content_for = "student"` aur `profile_type` wahi same value ho

---

## Iska matlab

Agar database me sirf `profileType` hai aur login me ye isi profile se populate nahi ho raha:
- to student ko correct `OSCE`/`Flashcard`/`Clinical Case` content nahi milega
- kyunki filter `contentFor` + `profileType` se match karta hai

---

## Simple rule

Student content ke liye required hain:
- `req.user.role == "STUDENT"`
- `req.user.profileType == "student_profile"` (JWT / auth middleware se)
- `account.profile_id.profileType` / `studentType` valid ho

Isse hi decide hota hai ki student kaunse content segment ke liye eligible hai.
--------------------------------------------------------------------------------------------------

Finding current signup and verification flow files so I can tell exactly what to change.

Searched for regex `isVerified|verify|otp|ProfileType|studentType|phone` (`**/*.{ts,tsx}`), 200 results

Searched for regex `sign up|register|signup|signUp|Register|register` (`**/*.{ts,tsx}`), 200 results

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/store/features/auth/auth.api.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.service.ts#1-1), lines 1 to 220

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/pages/authPage/Signup.tsx)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.validation.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.interface.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.controller.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.route.ts)

Searched for regex `update_student_profile_into_db|update_profiles_from_db|student profile` (`Zyura` · `zyura-backend/src/app/modules/auth/auth.service.ts`), 4 results

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.service.ts#220-220), lines 220 to 380

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/student/student.schema.ts)

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.schema.ts)

## Kya karna hai

Aapko student signup me `email`, `password`, `ProfileType` aur `phone` lena hai. Aur abhi jo OTP-based `isVerified` flow hai usko temporarily comment karna hai.

---

## Frontend files jo change karne hain

1. Signup.tsx
   - yahan signup form me:
     - `email`
     - `password`
     - `phone`
     - `profileType` (ya `studentType`) add karna
   - `signupSchema` me validation add karna
   - `onSubmit` me backend ko extra fields bhejna
   - agar OTP nahi chahiye to `navigate("/verification-otp")` hata dena aur seedha login/dashboard route pe le ja sakte ho

2. auth.api.ts
   - `registerUser` mutation already POST karta hai `/auth/register`
   - kisi extra field ko body me bhejne ke liye API ko change nahi karna, bas Signup.tsx se `registerUser({ email, password, phone, studentType })` bhejna kaafi hai
   - agar OTP flow puri tarah hata rahe ho to `useVerifyOTPMutation` aur `useResendOTPMutation` ko comment ya ignore kar sakte ho

3. AuthRoutes.tsx
   - agar aap OTP page use nahi karna chahte to `/verification-otp` route ko comment kar do
   - optional: VerificationOTP.tsx ko ab use nahi karoge

4. VerificationOTP.tsx
   - agar OTP flow hata rahe ho to is page ko ya to comment kar do ya route se hata do

---

## Backend files jo change karne hain

1. auth.interface.ts
   - `TRegisterPayload` ko extend karo:
     - `phone?: string`
     - `studentType?: string` (ya `profileType` agar aap wahi name use karna chahte ho)

2. auth.validation.ts
   - `register_validation` me extra fields add karo:
     - `phone`
     - `studentType`
   - example:
     - `studentType: z.string().nonempty("Profile type is required")`
     - `phone: z.string().nonempty("Phone is required")`

3. auth.service.ts
   - sabse important:
     - `register_user_into_db` me OTP generation + email send hatao
     - account create karte waqt `isVerified: true` set karo
     - agar aap student ka profile bhi seedha create karna chahte ho, to yahan `Student_Model.create({ accountId, studentType, phone, ... })` add kar sakte ho

   - current code me register_user_into_db me ye hota hai:
     - `lastOTP: otp`
     - `role: "STUDENT"`
     - `profile_type: "student_profile"`
     - OTP email send
   - aapko isko badal ke ye karna chahiye:
     - `isVerified: true`
     - no `lastOTP`
     - no email send
     - optional: save `phone`/`studentType` in student profile

4. auth.route.ts
   - OTP endpoints ko comment karo agar puri flow hata rahe ho:
     - `authRoute.post("/verified-account", ...)`
     - `authRoute.post("/new-verification-otp", ...)`

5. auth.controller.ts
   - agar OTP routes remove karoge to yahan bhi `verified_account` aur `get_new_verification_otp` related controller functions ko route se nikaal sakte ho

6. auth.schema.ts
   - is file me `isVerified` already hai, default `false`
   - agar OTP skip kar rahe ho to `register_user_into_db` me `isVerified: true` dena zaroori hai

---

## `isVerified` kya karta hai

- `isVerified` account model ka boolean field hai.
- current setup me signup ke baad ye `false` hota hai.
- phir user ko OTP bheja jata hai `/auth/verified-account` pe.
- OTP successful hone par backend:
  - `isVerified: true`
  - `lastOTP` empty
- backend auth middleware me:
  - agar user verified nahi hai to protected routes pe access deny kar deta hai
- iska matlab:
  - agar aap OTP ko hata dete ho lekin `isVerified` ko `true` nahi karoge,
  - to user login to kar lega lekin protected APIs/`/auth/me` fail kar sakta hai

---

## Aapko kya store karna chahiye

Backend me role/profile ka difference samjho:

- `role = "STUDENT"` — account type
- `profile_type = "student_profile"` — account ka profile collection
- actual student category jo aap form me log karoge:
  - `studentType` / `profileType` (jaise `MBBS`, `Dental Student`, `Nursing Student`)
- ye field student profile document me jayegi, na ki account schema ke fixed `profile_type` me

---

## Short summary

1. Frontend: Signup.tsx me naya field add karo aur OTP redirect hatao.
2. Backend: auth.interface.ts, auth.validation.ts, auth.service.ts update karo.
3. OTP disable karne ke liye:
   - backend me register pe `isVerified: true`
   - OTP generation/email send remove
   - optional frontend OTP pages/routes comment/remove
4. `isVerified` ka use:
   - access control ke liye
   - agar false hai to protected APIs block honge

Agar chaho to main ab direct code patch bhi kar sakta hoon — frontend signup me `phone` + `profileType` add karke aur OTP flow disable karke.



-------------------------------------------------------------------------------------------------

Searched for regex `typeName|profile_type_const|studentType` (`**/zyura-backend/src/app/modules/profile_type_const/**/*.{ts,tsx}`), 50 results

Reading current signup page state and backend register payload types before patching.

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/pages/authPage/Signup.tsx#1-1), lines 1 to 220

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/pages/authPage/Signup.tsx#220-220), lines 220 to 246

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.service.ts#15-15), lines 15 to 110

Read [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.validation.ts#1-1), lines 1 to 30

Replacing 62 lines with 111 lines in [](file:///c%3A/projects/Zyura/zyura-frontend/src/pages/authPage/Signup.tsx), [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.interface.ts), [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.validation.ts), [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.service.ts)


```

```

```

```

```

```

```

```
One final cleanup: update backend signup success message to match the new no-OTP flow.

Replacing 9 lines with 9 lines in [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.service.ts)


```

```


Checked [](file:///c%3A/projects/Zyura/zyura-frontend/src/pages/authPage/Signup.tsx), [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.interface.ts), [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.validation.ts), [](file:///c%3A/projects/Zyura/zyura-backend/src/app/modules/auth/auth.service.ts), no problems found

## Signup page updated

Added required student signup fields and backend support.

### What changed

- Signup.tsx
  - Added `phone` field
  - Added `Profile Type` dropdown using `useGetAllStudentTypeQuery`
  - Added validation for `phone` and `studentType`
  - Sent `phone` and `studentType` in register payload
  - Updated UI copy to match full signup details

- auth.interface.ts
  - Extended `TRegisterPayload` with:
    - `phone?: string`
    - `studentType?: string`

- auth.validation.ts
  - Updated `register_validation` to require:
    - `phone`
    - `studentType`

- auth.service.ts
  - During registration now creates:
    - `Account_Model` record
    - `Student_Model` profile with `studentType` and `phone`
  - Links `profile_id` on account
  - Kept OTP flow disabled

### Result

Student signup now accepts:
- `email`
- `password`
- `phone`
- `ProfileType` (student type)

-------------------------------------------------------------------------------------------------
Checking the error source in StudentDashboardHeader.tsx and related data usage.

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/Layout/dashboard/StudentDashboardHeader.tsx)

Found the issue: `user.profile.firstName` can be undefined. I’m adding a safe initials fallback and guarding profile fields.

Replacing 10 lines with 16 lines in [](file:///c%3A/projects/Zyura/zyura-frontend/src/Layout/dashboard/StudentDashboardHeader.tsx)


```

```


Replacing 10 lines with 10 lines in [](file:///c%3A/projects/Zyura/zyura-frontend/src/Layout/dashboard/StudentDashboardHeader.tsx)


```

```


Replacing 7 lines with 10 lines in [](file:///c%3A/projects/Zyura/zyura-frontend/src/Layout/dashboard/StudentDashboardHeader.tsx)

I’m verifying the exact JSX block for the name display and then patching it safely.

Read [](file:///c%3A/projects/Zyura/zyura-frontend/src/Layout/dashboard/StudentDashboardHeader.tsx#80-80), lines 80 to 140

Replacing 9 lines with 13 lines in [](file:///c%3A/projects/Zyura/zyura-frontend/src/Layout/dashboard/StudentDashboardHeader.tsx)


```

```


Replacing 4 lines with 8 lines in [](file:///c%3A/projects/Zyura/zyura-frontend/src/Layout/dashboard/StudentDashboardHeader.tsx)


```

```


Checked [](file:///c%3A/projects/Zyura/zyura-frontend/src/Layout/dashboard/StudentDashboardHeader.tsx), no problems found

## Fix applied

Patched StudentDashboardHeader.tsx to avoid the crash.

### What changed
- Added a safe `initials` fallback for the profile circle
- Replaced direct `user?.profile?.firstName.slice(0, 2)` with `initials`
- Added fallback values for:
  - displayed user name
  - `studentType` label
  - dropdown name display

### Result
- No more crash when `user.profile.firstName` is missing
- Header now shows a fallback initial or email instead of throwing `slice` error

Made changes.