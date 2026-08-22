export default function LoadingSpinner({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} role="status" aria-live="polite">
      <div className="spinner" />
      {label && <span style={{ fontSize: 13.5, color: 'var(--color-text-muted)' }}>{label}</span>}
    </div>
  )
}
