import React from 'react';
import './stylereclamation.css';

function Reclamation() {
    return (
        <div className='componentreclamation'>
            {/* From Uiverse.io by sameer2malik */}
            <div className="containerreclamation">
                <div className="leftreaclamation">
                  <h1>FORMULAIRE DE RECLAMATION</h1>
                    <form className="formreclamation">
                        <div className="input-blockreclamation">
                            <input className="inputreclamation" type="text" id="email" required />
                            <label htmlFor="email">Username</label>
                        </div>
                        <div className="input-blockreclamation">
                            <select name="" id="" className='inputreclamation'>
                              <option value="">hhhhhhh</option>
                              <option value="">hhhhhhhhh</option>
                              <option value="">hhhhhhhh</option>
                            </select>
                        </div>
                        <div className="input-blockreclamation">
                            <textarea name="" id="" className='inputreclamation' placeholder='probleme de vous'></textarea>
                            
                        </div>
                        <div className="input-blockreclamation">
                            
                            <button type="submit" className='buuttonreclamation'>Submit</button>
                        </div>
                    </form>
                </div>
                <div className="rightreclamation">
                    <div className="img">
                      <img src="./imagess/erreur2.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reclamation;

