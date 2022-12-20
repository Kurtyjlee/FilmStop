import React from "react";
import { Header } from "./Header";
import { Link } from "react-router-dom";

// Component takes in elements
type WrapperProps = {
  children: React.ReactNode;
};

export const Wrapper = (props: WrapperProps) => {
  return (
    <>
      <Header/>
      <div className="nav">
        <ul className="App-header">  
          <li>  
            <Link to="/">Home</Link>  
          </li>  
          <li>  
            <Link to="/users">User</Link>  
          </li>   
        </ul> 
      </div>
      {props.children}
    </>
  )
}

// // Class format
// class Wrapper extends Component {
//   render () {
//     return (
//       <>
//         <Header/>
//         <div className="nav">
//           <ul className="App-header">  
//             <li>  
//               <Link to="/">Home</Link>  
//             </li>  
//             <li>  
//               <Link to="/users">User</Link>  
//             </li>   
//           </ul> 
//         </div>
//       </>
//     )
//   }
// }

// export default Wrapper;
