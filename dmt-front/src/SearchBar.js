import React, { Component } from 'react';
import SearchBox from './search-box';
import './SearchBar.css';
const words = ["abc", "abe", "abd", "eyt"]

export default class SearchBar extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        suggestions: []
      };
     // autoBind(this);
    }
  
    handleClear = () =>{
      this.setState({
        suggestions: []
      });
    }
  
    handleChange = (input) => {
      this.setState({
        suggestions: words.filter(word => word.startsWith(input))
      });
    }
  
    handleSelection = (value) => {
      if (value) {
        console.info(`Selected "${value}"`);
      }
    }
  
    handleSearch = (value) => {
      if (value) {
        console.info(`Searching "${value}"`);
      }
    }
  
    suggestionRenderer(suggestion, searchTerm) {
      return (
        <span>
          <span>{searchTerm}</span>
          <strong>{suggestion.substr(searchTerm.length)}</strong>
        </span>
      );
    }
  
    render() {
      return (
        <div className='SearchBar-wrapper'>
        <center>
        <SearchBox 
          autoFocus
          renderClearButton
          renderSearchButton
          placeholder="Search data by experiments or ids or types"
          onChange={this.handleChange}
          onClear={this.handleClear}
          onSelection={this.handleSelection}
          onSearch={this.handleSearch}
          suggestions={this.state.suggestions}
          suggestionRenderer={this.suggestionRenderer}
           styles={{
            wrapper: 'SearchBar-searchbox',
            field: 'SearchBar-field',
            focusedField: 'SearchBar-field--focused',
            //hasSuggestions: 'react-search-bar__field--has-suggestions',
            input: 'SearchBar-input',
            clearButton: 'SearchBar-clear-button',
            submitButton: 'SearchBar-submit-button',
            suggestions: 'SearchBar-suggestions',
            suggestion: 'SearchBar-suggestion',
            focused: 'SearchBar-suggestion--focused'
          }}
        />
        </center>
        </div>
      );
    }
  }
  