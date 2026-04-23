# Vydon Keycloak Theme

Custom Keycloak login theme for Vydon, built with [Keycloakify v9](https://www.keycloakify.dev/).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build-keycloak-theme
```

This generates a `.jar` file in `dist_keycloak/target/` that can be deployed to Keycloak.

## Deployment

Copy the generated `.jar` file to your Keycloak's `providers/` directory (Keycloak 17+) or `standalone/deployments/` (legacy) and restart Keycloak. Then select the theme in your realm's login settings.
