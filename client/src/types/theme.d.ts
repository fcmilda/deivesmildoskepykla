import '@mui/material/styles';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    section: CSSProperties;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    bakery?: PaletteColorOptions;
  }

  interface Palette {
    bakery: PaletteColor;
  }
}
