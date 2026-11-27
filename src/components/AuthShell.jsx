export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="brand">
          <span className="brand-mark">C</span>
          <span className="brand-text">Chirp</span>
        </div>
        <h1>What is happening on campus, in 280 characters.</h1>
        <ul>
          <li>Follow classmates, clubs and friends</li>
          <li>See trending hashtags of the last 24 hours</li>
          <li>Get live updates when new posts arrive</li>
        </ul>
      </div>
      <div className="auth-form">
        <div className="card auth-card">
          <h2>{title}</h2>
          <p className="muted">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
