# Hotel Staff Manager

A responsive, single-page **Hotel Staff Manager** web application built with React and Vite. It connects to the live **Hotel Staff CRUD API** to manage staff members, roles, schedules, and statuses.

## Features

- **Full Staff CRUD**: Read, Create, Update (direct & update-by-email flow), and Delete staff members.
- **Search**: Server-side partial search on name, email, phone, employee code, or role using API query parameter `q`.
- **Filtering**: Multi-parameter filter support for Role, Department, Shift, and Status with values fetched from `/api/filters`.
- **Pagination**: Server-driven pagination with controls (`Previous`, `Page count`, `Next`).
- **Update by Email Route**: Dedicated flow allowing users to locate staff by email address and update details instantly.
- **Form Validation**: Strict client-side validation for required fields, email format, 10-digit unique phone numbers, and dropdown selection.
- **Error & Loading States**: Clean UI banners, inline validation error messages, network failure retries, loading spinners, and empty states.
- **Stats Dashboard**: Live metric summary for Total, Active, On Leave, and Inactive staff fetched from `/api/stats`.
- **Responsive UI**: Fully responsive admin dashboard layout designed to work seamlessly on Mobile, Tablet, and Desktop.

## Tech Stack

- **Frontend Core**: React 18, Vite
- **Styling**: Vanilla CSS (CSS variables, Flexbox/Grid)
- **Icons**: Lucide React
- **API Communication**: Native `Fetch` API

## API Configuration

Base URL: `https://testaug.onrender.com`

Supported Endpoints:
- `GET /health` - API Health status
- `GET /api/staff` - Fetch paginated staff list with search (`q`) and filters (`role`, `department`, `shift`, `status`, `page`, `limit`)
- `GET /api/staff/:id` - Fetch details for a specific staff member
- `POST /api/staff` - Create new staff member (*department and employeeCode auto-generated*)
- `PUT /api/staff/:id` - Update existing staff member
- `DELETE /api/staff/:id` - Delete staff member
- `GET /api/filters` - Fetch available dropdown filter options
- `GET /api/stats` - Fetch overall staff statistics

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd react-ap
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://testaug.onrender.com
   ```

4. **Run locally**:
   ```bash
   npm run dev
   ```

## Production Build

To test or generate the production build:

```bash
npm run build
```

The output bundle will be located in the `dist/` directory.

## Deployment to Vercel

1. Push your repository to **GitHub**.
2. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository.
4. Set the **Framework Preset** to `Vite`.
5. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = `https://testaug.onrender.com`
6. Click **Deploy**. Vercel will automatically build and publish your project!
