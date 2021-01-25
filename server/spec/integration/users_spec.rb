require 'swagger_helper'

describe 'Users API' do
  path '/api/users' do
    post 'Creates a user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          nickname: { type: :string}
        },
        required: ['nickname']
      }
      response '201', 'user created' do
        schema '$ref' => '#/definitions/user'
        let(:user) {{ nickname: 'foo'}}
        run_test!
      end
      response '422', 'invalid request' do
        let(:user) {{}}
        run_test!
      end
    end
  end
  path '/api/users/{id}' do
    patch 'Modifies an user' do
      tags 'Users'
      consumes 'application/json'
      parameter name: :id, in: :path, type: :integer, in: :body, schema: {
        type: :object,
        properties: {
          nickname: { type: :string}
        },
      }
      response '200', 'user modified' do
        schema '$ref' => '#/definitions/user'
        let(:user) {{ nickname: 'modified'}}
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
        schema '$ref' => '#/definitions/user'
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
      response '200', 'user deleted' do
        let(:id) { User.create(nickname: 'foo').id }
        run_test!
      end
    end
  end
end
