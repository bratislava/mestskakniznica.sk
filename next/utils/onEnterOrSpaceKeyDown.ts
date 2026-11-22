export const onEnterOrSpaceKeyDown = (callback: () => void) => {
  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      callback()
    }
  }
}
