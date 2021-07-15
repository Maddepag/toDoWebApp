import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default class CreateListPage extends Component{
    constructor(props){
        super(props);
        this.state ={
            guestEditList: true,
        }; 
        this.handleListButtonPressed = this.handleListButtonPressed.bind(this);
        this.handleGuestEditList = this.handleGuestEditList.bind(this);
        
    }
   
    handleGuestEditList(e){
        this.setState({
            guestEditList: e.target.value === "true" ? true:false,
        });
    }
    
    handleListButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                guest_edit_list: this.state.guestEditList,
            }),
        };
       fetch("/api/create-list", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data)); 

    }


    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align= "center">
                    <Typography component="h4" variant= "h4">
                    create a new list
                    </Typography>
                </Grid>
                <Grid item xs={12} align= "center">
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center"> guests are able to</div>
                        </FormHelperText>
                            <RadioGroup row defaultValue="True" onChange ={this.handleGuestEditList}>
                                
                            <FormControlLabel 
                                    value="true"
                                    control={<Radio color="primary" />}
                                    label="create and manage tasks"
                                    labelPlacement="bottom"
                                   
                            />
                            <FormControlLabel 
                                    value="false"
                                    control={<Radio color= "primary" />}
                                    label="check/uncheck tasks only"
                                    labelPlacement="bottom"
                            />
                                                
                            </RadioGroup>
                    </FormControl>

                </Grid>

                <Grid item xs={12} align= "center">
                <Button variant="contained" onClick= {this.handleListButtonPressed}>
                    create list
                </Button>
                </Grid>

                <Grid item xs={12} align= "center">
                <Button variant="contained" to="/" component={Link}>
                    back
                </Button>
                </Grid>


            </Grid>
        );
    }
}