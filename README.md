
# Next.js App with Supabase Authentication

This is a simple Next.js app integrated with Supabase for authentication. Below are the steps to run it locally.

## Steps to Run Locally

1. **Install Dependencies**
   First, install the required dependencies by running the following command:

   ```bash
   npm install
   ```

2. **Create `.env.local` File**
   In the root directory of your project, create a `.env.local` file with the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ```

   - You can find these values in your Supabase project's settings under **API**.

3. **Run the Development Server**
   Start the development server with:

   ```bash
   npm run dev
   ```

   This will start your app at `http://localhost:3000`.

4. **Open the App**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app running locally.

5. **Deployed in Vercel**
   Open your browser and navigate to [https://konexi-nine.vercel.app/](https://konexi-nine.vercel.app/) to see the app running locally.

---

## What Would You Improve if Given More Time?

If given more time, I would integrate a state management solution (like Redux or Zustand) to handle user sessions and other state-related features more efficiently, ensuring better scalability and maintainability of the app.
