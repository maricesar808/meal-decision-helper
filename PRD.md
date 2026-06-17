# Product Requirements Document: Meal Decision Helper

## 1. Overview

Meal Decision Helper is a simple web tool that helps a user decide where or what to eat by comparing meal or restaurant options. The user enters possible choices, rates each one using the same 1-5 scale across three categories, and calculates a ranked top 3 list.

The product is designed for moments when choosing a place to eat with friends or family takes too long because there are too many acceptable options and no clear winner.

## 2. Target User

The primary user is the creator of the app: someone who feels indecisive when choosing a meal or restaurant, especially in social situations with friends or family.

## 3. Problem Statement

Choosing where to eat can become slow and frustrating when options are compared informally. The user may debate cost, healthiness, and travel time without a clear way to balance those factors. Meal Decision Helper solves this by turning the decision into a quick comparison with visible scores.

## 4. Goals

- Help the user compare 2-10 meal or restaurant options.
- Make the decision process faster and more straightforward.
- Show a ranked top 3 list of the best options.
- Make the recommendation understandable by showing both total score and category ratings.
- Keep the interface clean, simple, and practical.

## 5. Non-Goals

- The app will not save options after the page is refreshed.
- The app will not recommend restaurants automatically from the internet or maps.
- The app will not use location services.
- The app will not include complex weighting or advanced preference settings.
- The app will not focus on detailed nutrition or price data.

## 6. Key Product Decisions

- Cost, healthiness, and travel time are equally important.
- All rating categories use a 1-5 scale.
- A rating of 5 is always the best score.
- Rankings are generated only when the user clicks a Calculate button.
- The app starts with an empty form and empty list.
- The app stores data only during the current page session.

## 7. Rating System

Each meal option has three ratings:

- Cost: 5 means cheapest, 1 means most expensive.
- Healthiness: 5 means healthiest, 1 means least healthy.
- Travel time: 5 means shortest or most convenient, 1 means longest or least convenient.

The total score is the sum of all three category ratings.

Maximum score: 15  
Minimum score: 3

## 8. Core Features

### 8.1 Add Meal Option

The user can add a meal or restaurant option by entering:

- Name
- Cost rating from 1-5
- Healthiness rating from 1-5
- Travel time rating from 1-5

After a valid option is added, it appears in the list of options.

### 8.2 View Added Options

The app shows the options the user has already entered. Each option should display:

- Name
- Cost rating
- Healthiness rating
- Travel time rating

### 8.3 Edit Meal Option

The user can edit an existing meal option. Editing should allow the user to change:

- Name
- Cost rating
- Healthiness rating
- Travel time rating

The same validation rules used for adding an option also apply when editing an option.

After an option is edited, any existing ranking should be cleared so the user knows to calculate again.

### 8.4 Delete Meal Option

The user can delete an individual meal option from the list.

After an option is deleted, any existing ranking should be cleared so the user knows to calculate again.

### 8.5 Calculate Top 3 Ranking

The user can click a Calculate button to generate a ranked list.

The app should:

- Require at least 2 options before calculating.
- Calculate each option's total score out of 15.
- Sort options from highest score to lowest score.
- Show only the top 3 options.
- Treat the #1 ranked option as the recommended choice.

Each ranked result should show:

- Rank number
- Meal or restaurant name
- Total score out of 15
- Cost rating
- Healthiness rating
- Travel time rating

### 8.6 Tie Handling

If two or more options have the same total score, the app should randomly order the tied options. This helps the user keep moving toward a decision instead of getting stuck on equally scored choices.

### 8.7 Random Pick From Top 3

After the user calculates the top 3 ranking, the app should include a Random Pick button. This button randomly selects one option from the current top 3 list.

The random pick result should clearly show:

- The selected meal or restaurant name
- That it was chosen from the top 3 ranked options

If fewer than 3 options exist, the Random Pick button should randomly choose from the available ranked options after calculation.

### 8.8 Reset

The app should include a Reset button that clears:

- All meal options
- Any current rankings
- Any random pick result
- Any visible error messages

After reset, the app returns to its empty starting state.

## 9. Validation Rules

The app should prevent invalid entries and show a simple error message when needed.

Validation requirements:

- Name is required.
- Cost rating is required.
- Healthiness rating is required.
- Travel time rating is required.
- Duplicate meal or restaurant names are not allowed.
- The user cannot add more than 10 options.
- The user must enter at least 2 options before calculating rankings.
- The same validation rules apply when editing an existing option.
- When editing, the current option may keep its own name, but it cannot be changed to match another existing option's name.

## 10. User Flow

1. User opens the app.
2. App shows an empty form and empty option list.
3. User enters a meal or restaurant name.
4. User selects cost, healthiness, and travel time ratings from 1-5.
5. User adds the option.
6. App validates the entry.
7. If valid, app adds the option to the list.
8. User repeats until at least 2 options have been added.
9. User clicks Calculate.
10. App shows the top 3 ranked options.
11. User reviews the top recommendation and supporting scores.
12. User decides where or what to eat.

## 11. Error States

The app should show a simple error message when:

- The user tries to add or save an option with missing fields.
- The user tries to add a duplicate name.
- The user tries to add more than 10 options.
- The user tries to calculate with fewer than 2 options.
- The user tries to use Random Pick before calculating rankings.

Error messages should be short, clear, and placed near the form or relevant action.

## 12. Design Requirements

The app should feel clean and simple, like a practical decision tool.

Design expectations:

- Clear form inputs.
- Easy-to-read option list.
- Obvious Add, Edit, Delete, Calculate, and Reset actions.
- Ranked top 3 results should be visually easy to scan.
- The #1 recommendation should be clearly identifiable.
- The Random Pick result should be easy to notice after the user clicks the button.
- The app should not feel overly playful, decorative, or complex.

## 13. Success Criteria

The project is successful when the user can:

- Enter between 2 and 10 meal or restaurant options.
- Rate each option on cost, healthiness, and travel time.
- Calculate a top 3 ranked list.
- Randomly pick one option from the calculated top 3 list.
- See why each option ranked where it did.
- Make a decision faster without debating as much.

## 14. Future Enhancements

These ideas are outside the first version but could be added later:

- Save options using browser storage.
- Allow custom weighting for cost, healthiness, or travel time.
- Add more rating categories, such as taste, mood, or group preference.
- Add notes for each restaurant or meal option.
