import React, { Component } from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';

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
  }
];

/** REACT COMPONENTS
 * Components are able to get an app's state as props from the Redux Store when:
 *   1) They are nested inside a component that is wrapped in a <Provider> that is connected to a store (created somewhere with createStore)
 *   2) The components themselves are subscribed to the store
 * Generally you will not use store.subscribe() directly
 * Instead you will use connect() with mapStateToProps()
 * which handles subscribe() for you.
 * If mapDispatchToProps() is also used with connect(), the component will be able to dispatch actions to the Redux Store as well.
 */

class App extends Component {
  render() {
    const {addInstructor, instructors} = this.props;
    return (
      <div>
        <h1>Nucamp Instructors</h1>
        <hr />
        <AddInstructor className="Header" addInstructor={addInstructor} />
        <hr />
        <InstructorsList instructors={instructors} />
       </div>
     )
  }
}

class InstructorsList extends Component {
  render() {
    return (
        <ul>
          {this.props.instructors.map((instructor) => (
            <li key={instructor.id}>
              <Instructor
                instructor={instructor}
              />
            </li>
            )
          )}
        </ul>

    )
  }
}

class AddInstructor extends Component {
  constructor(props) {
    super(props);
    this.inputName = null;
    this.inputCourse = null;
    this.setTextInputRef = inputElement => {
      switch(inputElement.id) {
        case "name": this.inputName = inputElement; break;
        case "course": this.inputCourse = inputElement; break;
        default :;
      }
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.inputName.value || !this.inputCourse.value) {
      return;
    }
    this.props.addInstructor(this.inputName.value, this.inputCourse.value);
    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name </label>
        <input id="name" type="text" ref={this.setTextInputRef} />
        <label htmlFor="course"> Course Taught: </label>
        <input id="course" type="text" ref={this.setTextInputRef} />
        <button type="submit"> Add Instructor</button>
      </form>
     )
  }
}

class Instructor extends Component {
  render = () => {
    const { color, name, course} = this.props.instructor;
    let style = {background: color};
    return (
      <p
        style={style}
        className="instructor"
      >
        {name} - {course}
      </p>
    )
  }
}

/* ACTION TYPE */
const ADD_INSTRUCTOR = 'ADD_INSTRUCTOR';

/* ACTION */
const addInstructor = (name, course) => ({
  type: ADD_INSTRUCTOR,
  payload: {
    name: name,
    course: course
  }
});

/* REDUCER */

const Reducer = (state = INSTRUCTORS, action) => {
  switch (action.type) {
    case ADD_INSTRUCTOR:
      let instructor = action.payload;
      instructor.id = state.length;
      instructor.color = '#000';
      return state.concat(instructor);
    default:
      return state;
  }
};

/* STORE & CONNECTIONS TO STORE */

export const store = createStore(Reducer, INSTRUCTORS);

const mapStateToProps = state => {
  return {
    instructors: state
  }
};

const mapDispatchToProps = dispatch => ({
  addInstructor: (name, course) => dispatch(addInstructor(name, course))
});

// The below line isn't written in a specific way to work with Codepen.
// Inside of Codepen, you would call ReactDOM.render(
  // <Provider store={store}>
    // <App />
  // </Provider>,
  // document.getElementById("root")
//)
export default connect(mapStateToProps, mapDispatchToProps)(App);
