import { createTheme, MantineColorsTuple } from '@mantine/core';

const notelyPrimary: MantineColorsTuple = [
    '#eef2ff', // 50
    '#e0e7ff', // 100
    '#c7d2fe', // 200
    '#a5b4fc', // 300
    '#818cf8', // 400
    '#6366f1', // 500
    '#4f39f6', // 600 - Primary brand color
    '#3f2bd2', // 700 - Hover state
    '#3221a6', // 800
    '#201569', // 900
];


export const theme = createTheme({
    primaryColor: 'notely',
    colors: {
        notely: notelyPrimary,
    },
    fontFamily: "var(--font-plus-jakarta), sans-serif",
    fontFamilyMonospace: 'var(--font-geist-mono), Courier, monospace',
    defaultRadius: 'md',
    components: {
        // Customize default component props 
        Button: {
            defaultProps: {
                loaderProps: { type: 'dots' },
            },
        },
        Card: {
            defaultProps: {
                withBorder: true,
                shadow: 'sm',
            },
        },
    },

});