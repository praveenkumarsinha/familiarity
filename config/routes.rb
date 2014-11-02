Familiarity::Engine.routes.draw do
  resources :familiarities do
    collection do
      post 'save', as: 'save'
    end
  end
end
