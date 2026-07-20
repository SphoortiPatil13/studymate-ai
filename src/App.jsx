import Button from './components/Button';
import Input from './components/Input';
function App(){
  return (
    <>
    <h1>Hello StudyMate AI </h1>
    <p>This is my first react project</p>
    <Button text="Login" color="blue" />
    <br></br>
    <label>Email ID</label>
    <Input placeholder="Enter email" type="email"/> 
    <br></br>
    <label>Password</label>
    <Input placeholder="Enter password" type="password"/> 
    <br></br>
    <Button text="Submit" color="green" />
    
    </>
  );
}
export default App;