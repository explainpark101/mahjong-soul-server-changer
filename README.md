[한국어](README.kr.md) | [日本語](README.jp.md)

# Mahjong Soul Link Changer

This Chrome extension automatically redirects Mahjong Soul game URLs between the Global, Korean, and Japanese servers based on your preference.

> **Notice**: A new extension will be registered at https://chromewebstore.google.com/detail/ecjkkppiddmajmohljjapkndjehebphp/

## Features

- **Multi-Server Support**: Easily switch between Global (`mahjongsoul.game.yo-star.com`), Korean (`mahjongsoul.game.yo-star.com/kr`), and Japanese (`game.mahjongsoul.com`) servers.
- **Auto-Redirection**: Automatically detects `room` (friendly match) and `paipu` (game log) links and redirects them to your selected server.
- **User-Friendly Interface**: Simple popup interface to select your target server.
- **Localization**: Supports English, Korean, and Japanese languages.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked**.
5. Select the `src` directory of this project.

## Permissions Explanation

This extension requires the following permissions to function correctly:

- **`tabs`**: Required to access the URL of the current tab. This allows the extension to detect when you are visiting a Mahjong Soul link and read the query parameters (like `room` or `paipu`) to perform the redirection.
- **`storage`**: Required to save your preferred target server (Global, KR, or JP). This ensures your selection is remembered across browser sessions.
- **`webNavigation`**: Required to detect navigation events more robustly. This helps the extension catch URL changes that might not trigger a full page reload (e.g., in single-page applications) or to intercept navigations early.

## Usage

1. Click the extension icon in the Chrome toolbar.
2. Select your desired server (Global, KR, or JP).
3. When you visit a Mahjong Soul link (e.g., `?room=...`), it will automatically redirect to the server you selected.
