import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCodeMerge } from "@fortawesome/free-solid-svg-icons";

const About = () => {
	return (
		<div>
			<input type="checkbox" id="about-modal" className="modal-toggle" />
			{/* Use only one label */}
			<label htmlFor="about-modal" className="modal cursor-pointer">
				<div className="modal-box relative">
					<label
						htmlFor="about-modal"
						className="btn btn-sm btn-circle absolute right-3 top-3"
					>
						✕
					</label>
					<h3 className="text-2xl font-bold">About</h3>
					{/* Use paragraphs directly, not nested */}
					<p className="pb-5 pt-5">
						All trivia questions provided by{" "}
						<a
							href="https://opentdb.com/"
							target="_blank"
							className="link link-info"
							rel="noopener noreferrer"
						>
							OpenTriviaDB{" "}
						</a>
						and{" "}
						<a
							href="https://the-trivia-api.com/"
							target="_blank"
							className="link link-info"
							rel="noopener noreferrer"
						>
							The-Trivia-API{" "}
						</a>
						are licensed under the{" "}
						<a
							href="https://creativecommons.org/licenses/by-nc/4.0/"
							target="blank"
							className="link link-info"
						>
							Creative Commons Attribution-NonCommercial 4.0 International License
						</a>
						.
					</p>
					<p className="pb-5">
						Questions provided by TriviaDart directly utilize questions found on the
						open web and are therefore open source and completely free to use. The
						trivia.csv file can be downloaded from the{" "}
						<a href="https://github.com/tpbnick/trivia-app" target="_blank">
							Github repository
						</a>
						.
					</p>
					<p className="text-center">Made with 🤍 by Nick Platt</p>
					<a
						href="https://github.com/tpbnick/trivia-app"
						target="_blank"
						rel="noopener noreferrer"
						className="flex justify-center text-4xl pt-3 pb-5"
					>
						<FontAwesomeIcon
							icon={faGithub}
							className="hover:text-secondary transition-all duration-200 transform hover:scale-110"
						/>
					</a>
					<p className="text-center">
						Latest Commit:{" "}
						<a
							href={`https://github.com/tpbnick/trivia-app/commit/${
								import.meta.env.VITE_GIT_SHA
							}`}
							target="_blank"
							rel="noopener noreferrer"
							className="link link-info"
						>
							{import.meta.env.VITE_GIT_SHA} <FontAwesomeIcon icon={faCodeMerge} />
						</a>
					</p>
					<p className="pb-2 text-center">
						Built: {import.meta.env.VITE_BUILD_DATE}
					</p>
				</div>
			</label>
		</div>
	);
};

export default About;
