

## Install Dependencies 
 <!-- used -->
pnpm install
///////////////

## Start Development Server 
<!-- used -->
pnpm run dev
///////////////

## Run Tests
<!--  used -->
pnpm run test
///////////////

## Environment Setup Copy 
<!--  used -->
.env.example to .env.local
Ask team lead for actual values
////////////////////////////////////////////////////////////

## Branching Strategy
<!--  used -->
main : Stable production code
dev : Latest development version

[feature/<task-name>] : Your working branch
Example: [feature/login-page]

////////////////////////////////////////////////////////////

# Font-Family (2)

1-: Open_Sans   [font-open_Sans]                <!--  Add in body dont need to call in class -->
2-: Rubik       [font-rubik]                    <!--  Majorly used for Headings -->

////////////////////////////////////////////////////////////

## Color

1-: Main Color  [yellow-----------(#FFB803)]     [text-primary]    [bg-primary]     <!--  ## Mostly used in Background -->
1-: Main Color light  [yellow-----------(#FEB9071F)]     [text-primary-light]    [bg-primary-light]     <!--  ## Mostly used in Background -->
2-: Secondary Color  [light-gray--(#EFEFEF)]     [text-secondary]  [bg-secondary]   <!--  ## Mostly used in Background -->
3-: gray Color [gray-------------(##606060)]     [text-gray]       [bg-gray]
4-: Black Color
5-: White Color

////////////////////////////////////////////////////////////

## Text-Size (in Desktop and mobile)

text-size= 14px                                 <!--  Add in body dont need to call in class -->

text-heading {
    @apply text-2xl md:text-3xl lg:text-4xl;    <!--  See text size 36 used """=> ( text-heading ) <=""" Desktop and mobile  -->
}

text-medium {
    @apply text-xl;                             <!--  See text size 20 used """=> ( text-medium ) <=""" Desktop and mobile  -->
}

Button Size = 16px   
