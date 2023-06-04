import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const About = () => {
	return (
		<div>
			<input type="checkbox" id="about-modal" className="modal-toggle" />
			<label htmlFor="about-modal" className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<label
						htmlFor="about-modal"
						className="btn btn-sm btn-circle absolute right-3 top-3"
					>
						✕
					</label>

					<h3 className="text-2xl font-bold">About</h3>
					<p className="py-4">All trivia questions are provided by:</p>
					<ol className="list-disc pl-8 pb-4">
						<li>
							<a
								href="https://opentdb.com/"
								target="_blank"
								className="link link-info"
							>
								OpenTriviaDB
							</a>
						</li>
						<li>
							<a
								href="https://the-trivia-api.com/"
								target="_blank"
								className="link link-info"
							>
								The-Trivia-API
							</a>
						</li>
					</ol>
					<p className="pb-5">
						All trivia questions provided by OpenTriviaDB and The-Trivia-API are
						licensed under the&nbsp;
						<a
							href="https://creativecommons.org/licenses/by-nc/4.0/"
							target="blank"
							className="link link-info"
						>
							Creative Commons Attribution-NonCommercial 4.0 International License
						</a>
						.
					</p>
					<p className="text-center">Made with 🤍 by Nick Platt</p>
					<a
						href="https://github.com/tpbnick/trivia-app"
						target="_blank"
						rel="noopener noreferrer"
						className="flex justify-center text-4xl pt-3 hover:text-green-300 transition-all duration-200 transform hover:scale-110"
					>
						<FontAwesomeIcon icon={faGithub} />
					</a>
				</label>
			</label>
		</div>
	);
};

export default About;
