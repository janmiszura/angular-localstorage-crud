'strict mode'

var contatosApp = angular.module('contatosApp', []);

contatosApp.factory('contatoService', function() {

  var factory = {};

  factory.listar = function() {

    var contatosJson = localStorage.getItem('contatos');

    var contatos = JSON.parse(contatosJson);

    return contatos;

  };

  factory.inserir = function(contato) {

    var contatos = factory.listar();

    if( ! contatos ) {
      contatos = [];
    }

    contatos.push(contato);

    localStorage.setItem('contatos', JSON.stringify(contatos));

  };

  factory.excluirTodos = function() {
    localStorage.setItem('contatos', '[]');
  };

  return factory;
});

contatosApp.controller('contatosController', ['$scope', 'contatoService', function ($scope, contatoService) {

    $scope.novo = function() {

      $('#contatoEdicaoModal').modal('show');

    };

    $scope.inserir5Contatos = function() {

      for(var i=1;i<=5;i++) {

        contatoService.inserir({
          id: new Date().getTime(),
          nome: 'nome '+new Date().getTime(),
          email: 'email'+new Date().getTime()+'@email.com',
          telefone: '(62) 99999999'
        });

      }

      $scope.listar();

    };

    $scope.excluirTodos = function() {

      contatoService.excluirTodos();

      $scope.listar();

    };

    $scope.listar = function() {

      $scope.contatos = contatoService.listar();

    };

    $scope.listar();

}])
