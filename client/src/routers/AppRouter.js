import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppNavbar } from '../components/AppNavbar';
import { AppAlert } from '../components/AppAlert';
import { AddMovieScreen } from '../screens/AddMovieScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MovieScreen } from '../screens/MovieScreen';
import { SearchScreen } from '../screens/SearchScreen';

export const AppRouter = () => {
  return (
    <Router>
      <AppNavbar />
      <AppAlert />
      <Container className="mt-3 mb-3">
        <Routes>
          <Route path="/" element={ <HomeScreen />}/>
          <Route path="/add-movie" element={ <AddMovieScreen /> } />
          <Route path="/movie/:id" element={ <MovieScreen /> } />
          <Route path="/search" element={ <SearchScreen /> } />
          <Route path="*" element={ <HomeScreen /> } />
        </Routes>
      </Container>
      
    </Router>
  );
}
