Feature: Avianca
 Búsqueda y reserva de vuelos en el sitio web de Avianca

 Scenario: Reserva de un vuelo
  Given I am in the avianca website
  When I select the origin city
  And I select the destination city
  And I select my departure date
  And I select my return date
  And I click on search for flights
  And I accept the notification pop-up
  Then I see a list of available flights

Scenario: Buscar vuelos
 Given I am in the avianca website
 When I click on the menu button
 And Select Horarios de vuelo
 And Select origin Bogota
 And Select destination Cartagena
 And Select a departure date
 And Select a return date
 And Click on Search button
 Then I should be able to sort the flights from latest to earliest