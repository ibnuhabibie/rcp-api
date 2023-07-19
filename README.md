# API

# TODO

- When customer register, check invitation with customer phone, then update customer_id
  so customer can accept or decline
- After reschedule, reinvite guests before
- Delete unused layout and bookings
- Fixing layout drafting
- When delete booking, send notif to all guest
- Booking activities make sure all activities logged
- Send notif to guests when booking got cancelled or rescheduled

# DONE

- Booking reminder twice. h-1 at 12. 2 hours before ✅
- Feedback akan d kirim setelah lewat 1 hari di jam 1 siang ✅
- Set default invitation status to null ✅
- Add validation total guest minus host ✅
- Add api booking & transaction history delete ✅
- Fixing outlet status near by✅
- Snooze Notif & Snooze Action ✅
- Auto cancel after 30 mins ✅
- Tambahin object is_accept di invitation notif detail ✅
- Snooze notif akan dikirim di start_date ✅
- Jadiin All Cpas utk Refund Voucher Code ✅
- Add code when creating admin ✅
- Reorder notif from newest ✅

- Accept Invitation, denied when booking status not proper. ✅
- Notification table BREAD, is read. per user. ✅
- Complimentary management✅
- Notification
  - Invitation for Outlet Reservation ✅
  - Account Deletion / Deactivate ✅
  - Payment success or expired ✅
- Add Firebase Push Notification Integration ✅
- Add organic coin to customer after payment success [Point = Payment * 2% / 1800] ✅
- Add organic coin to customer after quinos callback transaction [Point = Payment * 2% / 1800] ✅
- Add unorganic coin to customer after giving feedback [2 coin] [Rp.5000] ✅
- Add banner modules ✅
- Quinos Integration✅
  - GET Down Payment Amount ✅
  - Add transaction ✅
- Reschedule booking ✅
- Dashboard charting ✅
- Add payment status Payment Expired ✅
- Add style to venue ✅
- Add flow for payment success / expired callback xendit ✅
- Add is maintenance middleware ✅
- Enhance postman for creating outlet ✅
- Enhance authentication to support guest mode
- Enhance create booking with refund code ✅
- Enhance resetpass_activities ✅
- Coin Modules ✅

# Resources

- Data Wilayah Indonesia https://github.com/guzfirdaus/Wilayah-Administrasi-Indonesia

# Modules

Authentication

- Login Admin / Customer ✅
- Register Admin / Customer ✅
- Forgot Password ✅

Admin Module

- BREAD User (Browse, Read, Edit, Add, Delete) ✅
- Bulk Import Data with Excel file ✅

Role Module

- BREAD Role (Browse, Read, Edit, Add, Delete) ✅
- Permission Manager ✅

Outlet Module

- BREAD Outlet (Browse, Read, Edit, Add, Delete) ✅
- Bulk Import Data with Excel file ✅
- Activate / Deactivate Outlet ✅
- Open Hours Outlet ✅
- Menu Outlet with Ordering ✅
- Pictures Outlet with Ordering ✅
- Favorite Outlet Module ✅
- Card Module ✅

Customer Module

- BREAD Outlet (Browse, Read, Edit, Add, Delete) ✅
- Province & District Module ✅
- Blacklist Customer ✅
- Customer CheckIn [Bokings✅, Invitation✅]
- TanPoint✅
- Signin with TOTP ✅
- Import Export CSV ✅
- Customer Detail Others [Activities ✅, Checkin✅]

Reservation Module

- BREAD Reservation (Browse✅, Read✅, Add✅)
- Reschedule✅
- Cancel Reservation✅
- Booking Feedback ✅

Card Management Module

- BREAD Card (Browse, Read, Edit, Add, Delete)✅
- Transform HTML as Image✅

Content Module

- Privacy & Policy✅
- FAQ✅

Report✅

- Customer Data
  - total register based on date, bar chart
- Admin Data
  - total admin based on outlet, pie chart
- Customer Checkin Data
  - top 10 customer per outlet, list
- Reservation Data
  - total checkin based on date and outlet, bar chart
- Transaction Payment Data
  - total amount based on date and outlet, bar chart

Integration

- S3 for images✅
- with Quinos for Table Layout✅
- Push Notification with Firebase✅
- SMTP Email, Mailgun or other services✅

Transaction Email

- Forgot Password✅
- Welcome Email✅

Notification

- Invitation for Outlet Reservation✅
- Account Deletion✅


Dependencies for Puppeteer
sudo apt install -y libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxi-dev libxtst-dev libnss3 libcups2 libxss1 libxrandr2 libasound2 libatk1.0-0 libatk-bridge2.0-0 libpangocairo-1.0-0 libgtk-3-0 libgbm1
