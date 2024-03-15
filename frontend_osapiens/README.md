# Architecture explanation
The main idea is to manage two component folders, src/pages/ and src/components. In Pages folder there should be the view using both imported components, or jsx created in the own component.

The components folder is meant to contain all components used along the web application, this is the generic components that are going to be shown in several places like Card, ModalError..., and also, the components that are a specific part of the web application and they could be separated like NavBar.

The idea is Pages components are as small as possible, and to create as much generic components as i could.
Furthermore there are some specific folders like context (in this case there is only one file, but in a bigger application probably they would be more).
We created an interface folder to locate all the interfaces that are going to be used in several places.

# Technical decision
i used @tanstack/react-table 8.13.2 because i got used to using react-table v7 and in this case i wanted to try v8, in fact i started using v7 but i changed to v8

# Work sequence
  * Creating folders structure
  * Creating routing and pages components empty
  * Creating navbar component
  * Creating context with main api call and table component
  * Creating favorites cards 
  * Removal element from favourites with confirmation 
  * Creating planet detail component 
  * Changing react-table version and to do sorting of diameter and population
  * Pagination on api call and pagination component
  * Creation interfaces and other typescript stuff

# Testing strategy
i used to use jest, however, my idea was to install vitest and try it but unfortunately i hadn't time, i did lot of manual test while coding.

# Alternatives i could have used
I installed styled-components but i'm a bit slower using that so in this case i used css files

# Improvements
Create some automatic test, and i think that in some cases i could have done the management with props and context better. Other improvement point is typescript, i implemented it at the end, so probably the code can have some mistake.
Other improvement would be to implement docker because this was not the highest priority and i could not do it in this version.

# Notes
I guess the api url changed during the week i was doing this project because https://swapi.dev/ got Not found page, while https://swapi.py4e.com/api/ worked properly.
In the cards component, there was supposed to be an image, but i did not see any picture for the planets in the api. I checked /planets and planets/{id} but at the end I left the alternative text as I assumed that the api had changed (just as the url changed) and now there was no image.



