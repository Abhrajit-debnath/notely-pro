import { createTheme, MantineColorsTuple } from '@mantine/core';

const notelyPrimary: MantineColorsTuple = [
    '#f3f0ff',
    '#e5dbff',
    '#d0bfff',
    '#b197fc',
    '#94d82d', // Accent hint or highlight
    '#7048e8',
    '#5f3dc4', // Primary brand color
    '#512da8',
    '#4527a0',
    '#311b92',
];


export const theme = createTheme({

    primaryColor: 'notely',

    colors: {

        notely: notelyPrimary,

    },

    fontFamily: 'var(--font-geist-sans), sans-serif',

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