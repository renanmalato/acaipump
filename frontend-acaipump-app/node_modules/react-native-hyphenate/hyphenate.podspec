
Pod::Spec.new do |spec|
  spec.name         = "hyphenate"
  spec.version      = "1.3.2"
  spec.summary      = "hyphenate"
  spec.description  = <<-DESC
                      cs
                      DESC
  spec.homepage     = "https://github.com/Tim-Burbank/react-native-hyphenate.git"
  spec.license      = "MIT"
  spec.author             = { "a" => "a@a.com" }
  spec.platform     = :ios, "7.0"
  spec.source       = { :git => "https://github.com/Tim-Burbank/react-native-hyphenate.git", :tag => "#{spec.version}" }
  spec.source_files  = "**/*.{h,m}"
  # spec.resource_bundle = {
  #   'RNHyphenate' => [
  #     'HyphenateSDK/**/*.{png,strings,json}'
  #   ]
  # }
  spec.vendored_libraries = "**/libHyphenateSDK.a"
  spec.resources    = '**/FeedbackBundle.bundle'
  spec.dependency "React"
end
