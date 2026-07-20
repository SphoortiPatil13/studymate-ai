function Input(props){
    return(
        <>
        <label>{props.label}</label>
        <br></br>
        <input 
         type={props.type}
         placeholder={props.placeholder}
         /> 
         <br/>
         <br/>
         </>
    );
}
export default Input;