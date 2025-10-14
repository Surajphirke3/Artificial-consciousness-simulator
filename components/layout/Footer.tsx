export default function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} ACS. All rights reserved.
    </footer>
  )
}
