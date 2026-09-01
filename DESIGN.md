# Design System

## Visual world

Shaurya Roy's portfolio is a dark developer library: a calm black listening room framed by an electric-blue and violet signal-cover image. It borrows the ease of browsing a music catalogue without copying Spotify's marks, artwork, or layout.

## Layout

- Desktop uses a fixed 244px library rail and an anchored now-playing footer.
- The profile cover leads the page; project rows are the primary browsing unit.
- At 840px and below, the library rail becomes a menu and content becomes a single-column flow.

## Typography

- Instrument Sans carries display headings and prominent labels.
- Manrope carries interface and body copy.
- DM Mono is reserved for technical metadata, sequence numbers, and status text.

## Tokens

- `--ink`: `#080b12`
- `--panel`: `#10151f`
- `--text`: `#f6f8fb`
- `--muted`: `#aab3c1`
- `--lime`: `#c7fa4b`

## Interaction

Project rows open a detail dialog; the play control updates the now-playing state; navigation scrolls to the relevant portfolio chapter. Lime signals active and available states.
