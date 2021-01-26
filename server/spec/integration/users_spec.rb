require 'swagger_helper'

describe 'User API' do
  path '/api/users' do
    post 'Creates a user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          nickname: { type: :string},
        },
        required: ['nickname']
      }
      response '201', 'user created' do
        schema '$ref' => '#/components/schemas/user'
        let(:user) {{ nickname: 'foo' }}
        run_test!
      end
      response '422', 'invalid request' do
        let(:user) {{}}
        run_test!
      end
    end
  end
  path '/api/users/{id}' do
    parameter name: :id, in: :path, type: :string
    let(:user) { User.create(nickname: 'patchUser') }
    let(:id) { User.create(nickname: 'tutu').id }
    patch 'Modifies an user' do
      tags 'Users'
      operationId 'patchUser'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :user, in: :body, schema: {
        '$ref' => '#/components/schemas/user'
      }
      response '200', 'user modified' do
        schema oneOf: [{'$ref' => '#/components/schemas/user'}]
        run_test!
      end
    end
  end
  path '/api/users/{id}' do
    get 'Retrieves an user' do
      tags 'Users'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer
      response '200', 'user found' do
        schema oneOf: [{'$ref' => '#/components/schemas/user'}]
        let(:id) { User.create(nickname: 'foo').id }
        run_test!
      end
    end
  end
  path '/api/users/{id}' do
    delete 'Deletes an user' do
      tags 'Users'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer
      response '204', 'user deleted' do
        let(:id) { User.create(nickname: 'deleted').id }
        run_test!
      end
    end
  end

end
