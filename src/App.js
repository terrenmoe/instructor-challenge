import React from 'react';
import { createStore } from 'redux';
import { connect } from 'react-redux';

// You have learned to use 'import' to bring in components from libraries in your React project. Using const is another way to do it that works better in Codepen. Do not be concerned about the difference at this time.

/* Data */
const INSTRUCTORS = [{
	name: 'Michael Steinberg',
  id: 0,
	color: 'blue',
  course: 'React',
}, {
	name: 'James Pritchett',
  id: 1,
	color: 'green',
  course: 'React',
}, {
	name: 'Mathew Moser',
  id: 2,
	color: 'orange',
  course: 'React',
}, {
  name: 'Brent Schneider',
  id: 3,
  color: 'purple',
  course: 'React',
}];

/* ------ START PAYING ATTENTION HERE ------------------------------------- */

/* REACT COMPONENTS */
/* A React component is able to get the application state as props from the Redux Store when it is:
   1) Nested inside a component that is wrapped in a <Provider> that is connected to a store (created somewhere with createStore)
   2) It is subscribed to the store - generally you will not use store.subscribe() directly, but instead you will use connect() with mapStateToProps(), which handles subscribe() for you.

   If mapDispatchToProps() is also used with connect(), the component will be able to dispatch actions to the Redux Store as well. */

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Nucamp Instructors</h1>
        <hr />
        <AddInstructor addInstructor={this.props.addInstructor} />
        <hr />
        <InstructorsList instructors={this.props.instructors} />
       </div>
     )
  }
}

class InstructorsList extends React.Component {

  render() {
    return (
				<ul>
					{this.props.instructors.map((instructor) => (

						<li key={instructor.id}>
							<Instructor instructor={instructor} />
						</li>
            )
					)}
        </ul>

    )
  }
}

class AddInstructor extends React.Component {

  constructor(props) {
    super(props);

    this.inputName = null;
    this.inputCourse = null;

    this.setTextInputRef = inputElement => {
      console.log(inputElement);
      switch(inputElement.id) {
        case "name": this.inputName = inputElement; break;
        case "course": this.inputCourse = inputElement; break;
      }
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addInstructor(this.inputName.value, this.inputCourse.value);
    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="name">Name </label>
        <input id="name" type="text" ref={this.setTextInputRef} />
        <label for="course"> Course Taught: </label>
        <input id="course" type="text" ref={this.setTextInputRef} />
        <button type="submit"> Add Instructor</button>
      </form>
     )
  }
}

class Instructor extends React.Component {
  render = () => {
    let style = {background: this.props.instructor.color};
    return (
      <p
        style={style}
        className="instructor">
        {this.props.instructor.name} - {this.props.instructor.course}
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


// The below line is written in a specific way to work with Codepen. Outside of Codepen, you would export default connect([args])(App).
export default connect(mapStateToProps, mapDispatchToProps)(App);
