// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button
} from "@heroui/react";
import { InputFields } from "./logger";

function Navbar() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <nav className="navbar">
      <div className="navbar-logo">Stratos</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to='/logger'>Logger</Link></li>
        <Button color="primary" onPress={onOpen}>Add Activity</Button>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose)=>(
                    <>
                    <ModalHeader className='flex gap-1'>Add Activity</ModalHeader>
                    <ModalBody>
                        <InputFields onClose={onClose}></InputFields>
                    </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
      </ul>
    </nav>
  );
}

export default Navbar;