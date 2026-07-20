function Button(props){
    return(
        <button
         style={{
            backgroundColor:props.color,
            color:"white",
            padding:" 10px 20px",
            borderRadius:"8px",
            border:"none",
            cursor:"pointer"
         }}>
            {props.text}
        </button>
    );
}
export default Button;