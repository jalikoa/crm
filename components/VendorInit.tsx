'use client'

import Script from 'next/script'

export default function VendorInit() {
  return (
    <>
      {/* ================= CORE DEPENDENCIES ================= */}

      {/* jQuery (MUST be first) */}
      <Script
        src="/assets/vendors/js/jquery.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          // expose globally
          // @ts-ignore
          window.$ = window.jQuery
        }}
      />

      {/* Bootstrap & Core Utils */}
      <Script src="/assets/vendors/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/moment.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/perfect-scrollbar.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/pace.min.js" strategy="afterInteractive" />

      {/* ================= PLUGINS ================= */}

      {/* Charts & Tables */}
      <Script src="/assets/vendors/js/apexcharts.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/dataTables.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/dataTables.bs5.min.js" strategy="afterInteractive" />

      {/* Forms & Editors */}
      <Script src="/assets/vendors/js/quill.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/select2.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/select2-active.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/jquery.steps.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/jquery.validate.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/emojionearea.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/tagify.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/tagify-data.min.js" strategy="afterInteractive" />

      {/* Date & Time */}
      <Script src="/assets/vendors/js/datepicker.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/daterangepicker.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/tui-code-snippet.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/tui-date-picker.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/tui-time-picker.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/tui-calendar.min.js" strategy="afterInteractive" />

      {/* Alerts & Utils */}
      <Script src="/assets/vendors/js/sweetalert2.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/cleave.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/chance.min.js" strategy="afterInteractive" />
      <Script src="/assets/vendors/js/full-screen-helper.min.js" strategy="afterInteractive" />

      {/* Vendor bundle (keep last) */}
      <Script src="/assets/vendors/js/vendors.min.js" strategy="afterInteractive" />

      {/* ================= APP / THEME ================= */}

      <Script src="/assets/js/common-init.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/theme-customizer-init.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/analytics-init.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/dashboard-init.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/widgets-charts-init.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/widgets-tables-init.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/apps-calendar-init.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/apps-chat-init.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/settings-init.min.js" strategy="afterInteractive" />
    </>
  )
}
