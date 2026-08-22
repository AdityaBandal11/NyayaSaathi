const STATUS_STYLES = {
  Draft: 'badge-gray',
  Submitted: 'badge-blue',
  Processing: 'badge-amber',
  Completed: 'badge-green',
}

export default function StatusBadge({ status }) {
  const cls = STATUS_STYLES[status] || 'badge-gray'
  return <span className={`badge ${cls}`}>{status}</span>
}
