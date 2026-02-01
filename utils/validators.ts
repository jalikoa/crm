export function getInitials(name?: string | null) {
  if (!name) return '';

  const trimmed = name.trim();
  if (!trimmed) return '';

  const parts = trimmed.split(/\s+/);

  // First + Last name
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // Single name → first 2 letters
  return trimmed.slice(0, 2).toUpperCase();
}
