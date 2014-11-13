$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "familiarity/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "familiarity"
  s.version     = Familiarity::VERSION
  s.authors     = ["Praveen Kumar Sinha"]
  s.email       = ["praveen.kumar.sinha@gmail.com"]
  s.homepage    = "https://github.com/praveenkumarsinha/familiarity"
  s.summary     = "Introduce-me step by step"
  s.description = "A very simple application to give an introduction of page(s) with finger pointing annotations on page elements to make user/visitor familiar to your application."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.1.6"
end
