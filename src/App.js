import React, { Component } from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import './App.css';

// You've used import' on components from libraries in your React project.
// Using const is another way to do it that works better in Codepen..

/* Data */
const INSTRUCTORS = [
  {
    name: 'Michael Steinberg',
    id: 0,
    color: 'blue',
    course: 'React',
  },
  {
    name: 'James Pritchett',
    id: 1,
    color: 'green',
    course: 'React',
  },
  {
    name: 'Mathew Moser',
    id: 2,
    color: 'orange',
    course: 'React',
  },
  {
    name: 'Brent Schneider',
    id: 3,
    color: 'purple',
    course: 'React',
  },
];

/** REACT COMPONENTS
 * Components are able to get an app's state as props from the Redux Store when:
 *   1) They are nested in a component that's wrapped in <Provider>
 *   2) That <Provider> is connected to a store (created somewhere with createStore)
 *   2) The components themselves are subscribed to the store
 * Generally you will not use store.subscribe() directly
 * Instead you will use connect() with mapStateToProps()
 * which handles subscribe() for you.
 * If mapDispatchToProps() is also used with connect()
 * The component will be able to dispatch actions to the Redux Store as well.
 */

function App(props) {
  const { addInstructor, instructors } = props;
  return (
    <div>
      <h1>Instructors</h1>
      <hr />
      <AddInstructor className="Header" addInstructor={addInstructor} />
      <hr />
      <InstructorsList instructors={instructors} />
    </div>
  );
}

function InstructorsList(props) {
  const { instructors } = props;
  return (
    <ul>
      {instructors.map((instructor) => (
        <li key={instructor.id}>
          <Instructor
            instructor={instructor}
          />
        </li>
      ))}
    </ul>
  );
}

class AddInstructor extends Component {
  constructor(props) {
    super(props);
    this.inputName = null;
    this.inputCourse = null;
    this.setTextInputRef = (inputElement) => {
      switch (inputElement.id) {
        case 'name': this.inputName = inputElement; break;
        case 'course': this.inputCourse = inputElement; break;
        default:
      }
    };
  }

  handleSubmit = (e) => {
    const { inputName, inputCourse, props: { addInstructor } } = this;
    e.preventDefault();
    if (!inputName.value || !inputCourse.value) {
      return;
    }
    addInstructor(inputName.value, inputCourse.value);
    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">
          Name:
          <input id="name" type="text" ref={this.setTextInputRef} />
        </label>
        <label htmlFor="course">
          Course Taught:
          <input id="course" type="text" ref={this.setTextInputRef} />
        </label>
        <button type="submit"> Add Instructor</button>
      </form>
    );
  }
}

function Instructor(props) {
  const { instructor: { color, name, course } } = props;
  const background = `#${(Math.abs(parseInt(color, 16) - 16777215)).toString(16)}`;
  const style = { color, background };
  return (
    <p
      style={style}
      className="instructor"
    >
      {`${name} - ${course}`}
    </p>
  );
}

/* ACTION TYPE */
const ADD_INSTRUCTOR = 'ADD_INSTRUCTOR';

/* ACTION */
const addInstructor = (name, course) => ({
  type: ADD_INSTRUCTOR,
  payload: {
    name,
    course,
  },
});

/* REDUCER */

const Reducer = (state = INSTRUCTORS, action) => {
  const instructor = {
    id: state.length,
    color: `#${state.length.toString(16).padEnd(7, '')}`,
    ...action.payload,
  };
  switch (action.type) {
    case ADD_INSTRUCTOR:
      return [...state, instructor];
    default:
      return state;
  }
};

/* STORE & CONNECTIONS TO STORE */

export const store = createStore(Reducer, INSTRUCTORS);

const mapStateToProps = (state) => {
  return {
    instructors: state
  };
};

const mapDispatchToProps = (dispatch) => ({
  addInstructor: (name, course) => dispatch(addInstructor(name, course)),
});

// The below line isn't written in a specific way to work with Codepen.
// Inside of Codepen, you would call ReactDOM.render(
// <Provider store={store}>
//   <App />
// </Provider>,
// document.getElementById("root")
export default connect(mapStateToProps, mapDispatchToProps)(App);
