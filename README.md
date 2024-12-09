# Laravel Reverb React Example

This example features a minimalistic real-time notification feature using Laravel and Reverb feature in a context of external frontend (React + Vite) with the use of Laravel Sanctum to provide and secure API endpoints.

## Requirements

- PHP >=8.2 (both Laravel 11 & Reverb need this version in order to work)
- Node JS environment runtime
- A code editor

## Installation

### Backend

```bash
composer install
```

```bash
npm install && npm run build
```

### Frontend

```bash
npm install
```

## Run
### Backend
```bash
composer run dev
```

### Reverb
```bash
php artisan reverb:start
```
you can add a ```--debug``` flag in order to get the logs and debug.

### Frontend
```bash
npm run dev
```
