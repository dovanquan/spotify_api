import React, { Component } from 'react';
import {connect} from 'react-redux';

import {actChangeQuery} from './../actions/index';

class FormSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
			query: '',
        };
    }

    handleChange = (event) => {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });
	}

	handleSearch = (event) => {
        let {query} = this.state;
        this.props.changeQuery(query);
        event.preventDefault();
    }

    handleClear = (event) => {
        this.props.changeQuery("");
        this.setState({query: ''});
		event.preventDefault();
    }

  render() {
  	let query = (this.state.query !== '') ? this.state.query : this.props.query;

    return (
		<div className="panel-heading">
			<form className="form-inline" role="form">
			   <div className="input-group">
			      <input name="query" value={query}  onChange={this.handleChange} type="text" className="form-control" placeholder="Enter artist name ..." />
                    <div className="input-group-btn">
                        <button onClick={this.handleSearch} type="button" className="btn btn-danger">Search</button>
                        <button onClick={this.handleClear} type="button" className="btn btn-warning">Clear</button>
                    </div>
			   </div>
			</form>
		</div>
    );
  }
}

const mapStateToProps = state => {
    return {
        query: state.query
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeQuery: (query) => {
            dispatch(actChangeQuery(query)) ;
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormSearch);
