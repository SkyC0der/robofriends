import React, { Component } from 'react';
import CardList from '../components/CardList' ;
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'

 class App extends Component {
     constructor(){
         super()
         this.state = {
            robots: [],
            searchfield: ''
         }
     }
     componentDidMount(){
          fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
                .then(users => {this.setState({ robots: users})});
      }

     onSearchChange = (event) =>   {
            this.setState({ searchfield: event.target.value })
        
        }
    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
            })
        return !robots.length ?
        (
        <div>
            <h1 className='tc f1'>Loading</h1> 
            <footer className = 'tc white f4'>Made with Chakra by <a href = "https://github.com/SkyC0der">SkyCoder</a> </footer>
        </div> ) : 
        (
                <div className='tc white bg-black-90'>
                    <h1 className = 'ma0 f1'>Robot Friends</h1>
                    <SearchBox searchChange= {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots } />
                        </ErrorBoundary>
                    </Scroll>
                    <footer>Made with Chakra by <a href = "https://github.com/SkyC0der">SkyCoder</a> </footer>
                </div>
            );
         }
    }

export default App;