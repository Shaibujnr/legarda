import {Component, Fragment, ChangeEvent} from 'react';
import {Input, Button, ListGroup, ListGroupItem} from 'reactstrap';


interface IAutoSuggestProps{
    suggestions:any[];
    placeholder: string;
    renderSuggestion(suggestion: any):any;
    getSuggestionValue(suggestion: any):string;
    fetchSuggestions(query:string):void;
    onSuggestionClicked(suggestion: any):void;
}

interface IAutoSuggestState{
    query: string;
}


export default class AutoSuggest extends Component<IAutoSuggestProps, IAutoSuggestState>{

    constructor(props:IAutoSuggestProps){
        super(props);
        this.state = {query:''};
    }

    onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        let query = event.target.value;
        this.props.fetchSuggestions(query);
        this.setState({
            query: query
        })
    }

    suggestionClicked = (suggestion: any) => {
        this.setState({
            query: this.props.getSuggestionValue(suggestion)
        });
        this.props.onSuggestionClicked(suggestion);
    }

    render(){
        let suggestionsListComponent;
        if(this.props.suggestions.length > 0){
            suggestionsListComponent = (
                <ListGroup>
                    {this.props.suggestions.map((value: any, index: number, array: any[]) => {
                        let suggestionValue = this.props.getSuggestionValue(value);
                        return (
                            <ListGroupItem action={true} key={suggestionValue} 
                                           onClick={() => {this.suggestionClicked(value)}}>
                                {suggestionValue}
                            </ListGroupItem>
                        );
                        
                    })}
                </ListGroup>
            );
        }

        return (
            <Fragment>
                <Input onChange={this.onQueryChange} value={this.state.query} placeholder={this.props.placeholder}/>
                {suggestionsListComponent}
            </Fragment>
        );
    }
}