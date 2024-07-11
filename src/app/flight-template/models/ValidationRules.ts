export const VALIDATION_RULES={
    text:[
        {
        inputType:"text",
        name:"containedIn",
        label:"Contained in text : "
        },{
        inputType:"text",
        name:"equalsWith",
        label:"Same with :"
        },{
            inputType:"array",
            name:"values",
            label:"Part of the list:"
        }
    ],
    number:[
        {
            inputType:"number",
            name:"min",
            label:"Less than :"
        },{
            inputType:"number",
            name:"mine",
            label:"Less or equal with :"
        },{
            inputType:"number",
            name:"max",
            label:"Greater than :"
        },{
            inputType:"number",
            name:"maxe",
            label:"Greater or equal with :"
        },{
            inputType:"array",
            name:"values",
            label:"Part of the list :"
        },
    ],
    precison_number:[
        {
            inputType:"ptrcision_number",
            name:"min",
            label:"Less than :"
        },{
            inputType:"precision_number",
            name:"mine",
            label:"Less or equal with :"
        },{
            inputType:"precision_number",
            name:"max",
            label:"Greater than :"
        },{
            inputType:"precision_number",
            name:"maxe",
            label:"Greater or equal with :"
        },{
            inputType:"array",
            name:"values",
            label:"Part of the list :"
        }
    ],
    date:[
        {
            inputType:"date",
            name:"before",
            label:"Before :"
        },{
            inputType:"date",
            name:"after",
            label:"After :"
        },{
            inputType:"intreval",
            name:"start,end",
            label:"In the intreval of time :"
        }
    ],
    array:[
        {
            inputType:"object",
            name:"contained",
            label:"Conatines :"
        },{
            inputType:"number",
            name:"max",
            label:"Maximum number of elements :"
        },{
            inputType:"number",
            name:"min",
            label:"Minimum number of elements :"
        },
    ]
}