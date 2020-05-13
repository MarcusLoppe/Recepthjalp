import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {mealTime, diet, time, grade, kcal} from './components/Query'
import {sorter} from './components/sorter'
import {Dropdown,Checkbox, Menu,Container,Accordion, Label,Input, Button,Icon ,Grid , Image, Item , Rating} from 'semantic-ui-react'
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module'
import CookieConsent from "react-cookie-consent";


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


class ExampleT extends React.Component{
  ingredients = {
    items: ["ägg", "vitkål","vitlöksklyftor" , "ostronsås"]
  };

  filters = {
    mealtime: '',
    diet: '',
    time: '',
    grade: '',
    kcal: '',
    climateSmart: false
  };

  constructor( props ) {
  		super( props );

      this.fetchSearchResults = this.fetchSearchResults.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.addIngredients = this.addIngredients.bind(this);
      this.handleSearchKeydown = this.handleSearchKeydown.bind(this);
  		this.state = {
        cookieconsent_status : Cookies.get('cookieconsent_status'),
        initialize_ga : false,
        activeIndex: null ,
  			query: '',
  			results: {},
  			loading: false,
  			message: ''
  		};
  	};

    fetchSearchResults = (queryItems, filter ) => {
    		axios.post(  `/api/recipe`, {
         "keywords" : queryItems,
         "filter" : filter
    		},{
          headers: {'Content-Type': 'application/json'
         }
        } )
    			.then(res => {
            this.setState( {
    					results: res.data
    				} )
    			} )
    			.catch( error => {
    				if ( axios.isCancel(error) || error ) {
              console.log("Failed to fetch the data. Please check network");

    					this.setState({
    						loading: false,
    						message: 'Failed to fetch the data. Please check network'
    					})
    				}
    			} )

          if (this.state.cookieconsent_status){
            if(this.state.initialize_ga == false){
              ReactGA.initialize('UA-163900334-1', 'auto' );
              const tagManagerArgs = {
                    gtmId: "GTM-K9WDKDN"
                      }
                            TagManager.initialize(tagManagerArgs );
              this.state.initialize_ga = true;
            }

            ReactGA.pageview('search.php?keywords=' + queryItems)
            queryItems.map(item => {
                ReactGA.pageview('search.php?keyword=' + item);
            });

            if(!!filter.diet)
                  ReactGA.event({    category: "Specialkost",     action: filter.diet,  value: filter.diet  });
            if(!!filter.mealTime)
                  ReactGA.event({    category: "Måltid", action: filter.mealTime,  value: filter.mealTime    });
            if(!!filter.time)
                  ReactGA.event({    category: "Tillagningstid",     action: filter.time,  value: filter.time    });
            if(!!filter.kcal)
                  ReactGA.event({    category: "Kcal",     action: filter.kcal,value: filter.kcal  });
            if(filter.climateSmart)
                  ReactGA.event({    category: "Klimartsmart" , action: "Klimartsmart",   value: "true" });
           }
    	};

  addIngredients () {
        this.setState(state => {
          if(document.getElementById('searchInput').value !== '') {
            const items = this.ingredients.items.push(document.getElementById('searchInput').value);
            document.getElementById('searchInput').value = "";
            return {   items,  name: '', };
          }
        })
  }

  removeIngredients = (event) => {
        const removeItem = event.target.getAttribute("aria-hidden");
        this.setState(state => {
            const items = this.ingredients.items.splice(this.ingredients.items.indexOf(removeItem),1);
            return {   items,  name: '', };
          }  )
  }

  handleSearch  ()  {
      this.setState(state => {
        this.fetchSearchResults(this.ingredients.items, this.filters);
      })
   }

   handleSearchKeydown = (e) => {
     if (e.key === 'Enter') {
       this.addIngredients();
     }
   }
   handleClick = (e, titleProps) => {
     const { index } = titleProps
     const { activeIndex } = this.state
     const newIndex = activeIndex === index ? -1 : index

     this.setState({ activeIndex: newIndex })
   };

   handleChangeFilter = (event, data) => {
     if(data.name == 'climateSmart')
       this.filters[data.name] = data.checked;
     else
       this.filters[data.name] = data.value;

       this.handleSearch();
    }

  renderSearchResults () {
  		const  results  = this.state.results;
      var curIndex = -1;
      const { activeIndex } = this.state
      var sorteredResults = sorter(this.state.results, this.ingredients);
			if ( Object.size(this.state.results) ) {
			         return (
                 <Grid centered columns={1}>
        					{
                    sorteredResults.results.map( result => {
                    curIndex ++;
          					return (
                      <Grid.Row>
                       <Grid.Column>
                        <Item.Group>
                         <Item>
                            <Item.Image  as='a' onClick={()=> window.open(result.URL, "_blank")} size='small' src={ result.IMG_URL } />
                            <Item.Content>
                              <Item.Header as='a' onClick={()=> window.open(result.URL, "_blank")} >{result.Name}</Item.Header>
                                 <Item.Meta>
                                    { result.IngredientsMatches.map(ingredientItem => {
                                            return(  <Label color='green'>{ ingredientItem }</Label>
                                                  )
                                        })
                                      }
                                      <br/>
                                      <Accordion>
                                           <Accordion.Title
                                             indexstate={activeIndex && curIndex}
                                             index={curIndex}
                                             onClick={this.handleClick}
                                           >
                                             <Icon name='dropdown' />
                                             Saknade ingredienser: (
                                                {  result.missingCount }
                                             )
                                           </Accordion.Title>
                                           <Accordion.Content active={activeIndex === curIndex}>
                                            {
                                                result.IngredientsMissing.map( curIngredient => {
                                                        return (
                                                           <Label size='small' id='missing' color='red'>{curIngredient}</Label>
                                                        )
                                                      })
                                            }
                                        </Accordion.Content>
                                        </Accordion>
                                   </Item.Meta>
                                   <Item.Extra>
                                     <Rating icon='star' rating={result.Rating} maxRating={5} disabled/>
                                    </Item.Extra>
                              </Item.Content>
                          </Item>
                       </Item.Group>
                       <hr className="myDivivder"/>
                   </Grid.Column>
                </Grid.Row>
                  )})}
          </Grid>
  			)}};


  render() {

    return (
      <div>
        <Image size='big' class="recipe-image-square__image" id='logopic' href="http://recepthjälp.se" src='.\logo.png'/>
        <br/>
        <Label.Group>
        <Label basic image>
         <Image size='tiny' src='.\images\input.png' />
          1. Mata in ingredienserna du vill använda
        </Label>  <br/>
        <Label basic image>
         <Image size='tiny' src='.\images\filter.png' />
          2. Filtera ut recept emot dina preferenser
        </Label>  <br/>
        <Label basic image>
         <Image size='tiny' src='.\images\pick.png' />
          3. Tryck på titlen och se hela receptet
        </Label>
          </Label.Group>  <br/>  <br/>
            <Input onKeyDown={this.handleSearchKeydown}  id='searchInput' style={{minWidth: '50%'}}
                icon={<Icon name='plus circle' color='green'  link  onClick={this.addIngredients} />}
                placeholder='Fyll i ingredienser'>
            </Input>

          <Button onClick={this.handleSearch}>
            <Icon name='search' />
          </Button>
          <br/>

          <div id="divIngredients" onClick={this.removeIngredients}>
             {this.ingredients.items.map(function(item){
                                                        return(
                                                        <Label >  {item}     <Icon aria-hidden={item} name='close' />   </Label>
                                                        )
                                                      })}
         </div>

        <br/><br/>
            <Dropdown name='mealtime' floating clearable compact placeholder='Måltid'
                      options={mealTime} onChange={this.handleChangeFilter} selection />
            <Dropdown name='diet' floating clearable compact  placeholder='Kosthållning'
                      options={diet} onChange={this.handleChangeFilter} selection />
            <Dropdown name='time' floating clearable  compact placeholder='Tillagningstid'
                      options={time} onChange={this.handleChangeFilter} selection />
            <Dropdown name='grade' floating clearable compact  placeholder='Betyg'
                      options={grade} onChange={this.handleChangeFilter} selection />
            <Dropdown name='kcal' floating clearable compact  placeholder='Kcal'
                      options={kcal} onChange={this.handleChangeFilter} selection />
            <Checkbox id="climateSmart" name='climateSmart' toggle label='Klimartsmart'
                        onChange={this.handleChangeFilter} />

                <br/><br/>
      { this.renderSearchResults() }


<CookieConsent

       enableDeclineButton
       declineButtonText="Decline (optional)"

     >
       This website uses cookies to enhance the user experience.{" "}
       <span style={{ fontSize: "10px" }}>
         This bit of text is smaller :O
       </span>
     </CookieConsent>
    </div>
);

}}

export default ExampleT
