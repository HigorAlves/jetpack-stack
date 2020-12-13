# Store

This boilerplate has a global store structure using plain React's context and typescript to be more lightweight and simple to use. The basic idea follows the same [Redux](https://redux.js.org/) and [Flux](https://facebook.github.io/flux/docs/in-depth-overview/) pattern, but using the React's `useReducer`.

```
                                                      +-----------+
                                   +-----------------+|  Actions  |<----------------+
                                   |                  +-----------+                 |
                                   |                                                |
                                   v                                                +
    +-----------+          +--------------+          +-------------+          +-----------------+
    |  Actions  |+-------->|  Dispatcher  |+-------->|    Store    |+-------->|    Container    |
    +-----------+          +--------------+          +-------------+          +-----------------+
```

## The folder structure

```
src/store             // Root folder
├── index.tsx         // Store initialization and hook export
│
├── people            // Store/Reduction example
│   ├── actions.ts    // Action creators
│   ├── index.ts      // Exports
│   ├── reducer.ts    // Reducer for this partition of the store
│   ├── selectors.ts  // Selectors for picking each part of the store
│   └── types.ts      // Typings
│
├── rootSelectors.ts  // Merge all selectors into onne
├── rootReducer.ts    // Merge all reducers into one
└── types.d.ts        // Typings
```

## Store initialization and hook export `src/store/index.tsx`

Here that is created the custom hook to access the store data inside the containers components. The store provider is used to pass the data to all the childrens, and since the whole app is wrapped by this provider, you can use the data anywhere you want, just call the `useStore` hook inside your component:

```jsx
import useStore from '@/store'

...

const { state, dispatch } = useStore()
```

The `store` object hold all the reductions in their root keys. If we want access the `name` property that's inside people reduction, we can use `state.people.name`.
The `dispatch` is a function that we can trigger actions passing an action creator as a parameter. These actions creators are placed into `src/store/[reduction]/actions.ts`, for the people example: `src/store/people/actions.ts`.

## Action creators `src/store/[reduction]/actions.ts`

Action creators are functions which returns an object with the properties type and payload. That type property is a string ID which all the reducers will listen to when dispatch function is called for trigger store changes. The payload object is optional and it can have any data that you need to use inside the reducer. Example of an action creator with the type `CHANGE_TEXT`:

```typescript
export enum Types {
  CHANGE_TEXT = 'CHANGE_TEXT'
}

export function changeText(message: string): ActionType {
  return {
    type: Types.CHANGE_TEXT,
    payload: {
      message
    }
  }
}
```

## Reducer or the partition of the store `src/store/[reduction]/reducer.ts`

> Reducers specify how the application's state changes in response to actions sent to the store.
> <cite>Redux docs</cite>

The reducer handle all the changes that you trigger by dispatching a action creator. It has to be a pure function that receives as parameters the state and the action object that has the type and the payload you've dispatched. This reducer function have to alwats return the state, even if there's no change, and that's why the state parameter receives the InitialState by default value.
You can use the `switch` statement to describe the state changes for each action that can be dispatched. Example of a reducer:

```typescript
export function reducer(state = InitialState, action: ActionType): StateType {
  switch (action.type) {
    case Types.CHANGE_TEXT:
      return { ...state, message: action.payload.message }
    default:
      return state
  }
}
```

## Selectors for picking each part of the store `src/store/[reduction]/selectors.ts`

The selectors are helper functions that return slices of the state. You can return the state value with any mutation that you can't do inside the reducer or in the store value itself. Instead of having a key inside the store for the number of elements inside an specific state value, or calling `state.people.length` on every page, you can use a selector that returns the number of people inside the store, like that example:

```typescript
export function Selector(state: StateType): SelectorType {
  function getMessage(): string {
    return state.message
  }

  function countPeople(): number {
    return state.people.length
  }

  return {
    getMessage,
    countPeople
  }
}
```

## Step by step guide

Let's say you want to add an array of people to store, and a way to add some person. Since the people reduction of the store is already created, the first thing you can do is to add a key for that list, by changing the `src/store/people/reducer.ts`:

```typescript
export const InitialState: StateType = {
  message: '👩‍🚀 Click to run an action',
+ people: []
}
```

And add the typings for the people state:

```typescript
export type StateType = {
  message: string
+ people: string[]
}
```

Now, we can access this state by calling in the container component:

```jsx
const { state } = useStore()

...

<ul>
  {state.people.map((person, index) => (
    <li key={index.toString()}>{person}</li>
  ))}
</ul>
```

If we want to add some person to this array, we can create an action for that. First we add the action type inside the `src/store/people/types.ts` in the types enum:

```typescript
export enum Types {
  CHANGE_TEXT = 'CHANGE_TEXT',
+ ADD_PEOPLE = 'ADD_PEOPLE'
}
```

And add the action creator inside `src/store/people/actions.ts` that uses this new type:

```typescript
export function addPeople(people: string): ActionType {
  return {
    type: Types.ADD_PEOPLE,
    payload: {
      people
    }
  }
}
```

When this action is dispatched, we want to change the state's people array. So we can update the people's reducer at `src/store/people/reducer.ts` by adding a new case to the `switch` statement:

```typescript
export function reducer(state = InitialState, action: ActionType): StateType {
  switch (action.type) {
    case Types.CHANGE_TEXT:
      return { ...state, message: action.payload.message }
+   case Types.ADD_PEOPLE:
+     return { ...state, people: [...state.people, action.payload.people] }
    default:
      return state
  }
}

```

And add the typings for the payload that we will receive inside the people reducer at `src/store/people/types.ts`:

```typescript
export type PayloadType = {
  [Types.CHANGE_TEXT]: {
    message: string
  }
+ [Types.ADD_PEOPLE]: {
+   people: string
+ }
}
```

And it's done! Now you have an array of people and you can add persons to it:

```jsx
import { addPeople } from '@/store/people/actions'

...

const { state, dispatch } = useStore()

...


function handleSubmit(name: string): void {
  dispatch(addPeople(name))
}
```
