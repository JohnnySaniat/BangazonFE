/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" id="Navigation" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="d-flex align-items-center">
            <span className="mr-2">Bangazon</span>
            <Image className="navbar-logo" src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-third-eye-vector-png-image_11055622.png" alt="RAD DAD Logo" fluid />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link passHref href="/products">
              <Nav.Link>Shop</Nav.Link>
            </Link>
            <Link passHref href="/users">
              <Nav.Link>Dashboard</Nav.Link>
            </Link>
            <Link passHref href="/orders">
              <Nav.Link>
                <Image src="https://cdn.iconscout.com/icon/free/png-512/free-shopping-bag-1683006-1440921.png?f=webp&w=256" alt="Bag Icon" fluid className="navbar-bag-icon" />
              </Nav.Link>
            </Link>
          </Nav>
          <Button variant="danger" id="sign-out" className="user-card-button" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
