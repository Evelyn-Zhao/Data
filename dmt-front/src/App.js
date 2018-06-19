import React, { Component } from 'react';
import './App.css';

class App extends Component {
  async componentDidMount() {
    console.log('asdasd')
    //it is not excuted in sequence, after the fetch method has been excuted, the then() method will be put in the end of Event Loop
    //fetch("http://jsonplaceholder.typicode.com/posts/1").then(Response => Response.json()).then(json => console.log(json))
    /*try{
    const response = await fetch("http://jsonplaceholder.typicode.com/posts/1", {'mode': 'no-cors'});
    
    const json = await response.json();
    console.log(json);
  }
    catch(e){
      console.log(e)
    }*/
    
    
  } 
  // after getting the new json data, the webpage will refresh the content. 
  // if only refresh a component, just update the info within the component 
  
  state={data: undefined}
  render() {
    return (
      <div className="App">
       
        <header className="App-header">
         {/*<AppBackground/>*/}
         <p className = "App-title" style={{zIndex: 10}}> HCC Group Data Management Platform</p>
        </header>
        <p className="App-intro">
          
        </p>
      </div>
    );
  }
}

export default App;
