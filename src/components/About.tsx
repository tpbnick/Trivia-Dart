import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCodeMerge } from "@fortawesome/free-solid-svg-icons";

interface ExternalLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children, className = "" }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className={`link link-info ${className}`}
	>
		{children}
	</a>
);

const About: React.FC = () => {
	const gitSha = import.meta.env.VITE_GIT_SHA || "unknown";
	const buildDate = import.meta.env.VITE_BUILD_DATE || "unknown";

	return (
		<div>
			<input type="checkbox" id="about-modal" className="modal-toggle" />
			<label htmlFor="about-modal" className="modal cursor-pointer">
				<div className="modal-box relative">
					<label
						htmlFor="about-modal"
						className="btn btn-sm btn-circle absolute right-3 top-3"
						aria-label="Close about modal"
					>
						✕
					</label>
					<h3 className="text-2xl font-bold">About</h3>
					<p className="pb-5 pt-5">
						All trivia questions provided by{" "}
						<ExternalLink href="https://opentdb.com/">
							OpenTriviaDB{" "}
						</ExternalLink>
						and{" "}
						<ExternalLink href="https://the-trivia-api.com/">
							The-Trivia-API{" "}
						</ExternalLink>
						are licensed under the{" "}
						<ExternalLink href="https://creativecommons.org/licenses/by-nc/4.0/">
							Creative Commons Attribution-NonCommercial 4.0 International License
						</ExternalLink>
						.
					</p>
					<p className="pb-5">
						Questions provided by TriviaDart directly utilize questions found on the
						open web and are therefore open source and completely free to use. The
						trivia.csv file can be downloaded from the{" "}
						<ExternalLink href="https://github.com/tpbnick/trivia-app">
							Github repository
						</ExternalLink>
						.
					</p>
					<p className="text-center">Made with 🤍 by Nick Platt</p>
					<ExternalLink
						href="https://github.com/tpbnick/trivia-app"
						className="flex justify-center text-4xl pt-3 pb-5"
					>
						<FontAwesomeIcon
							icon={faGithub}
							className="hover:text-secondary transition-all duration-200 transform hover:scale-110"
							aria-label="GitHub repository"
						/>
					</ExternalLink>
					<p className="text-center">
						Latest Commit:{" "}
						<ExternalLink
							href={`https://github.com/tpbnick/trivia-app/commit/${gitSha}`}
						>
							{gitSha} <FontAwesomeIcon icon={faCodeMerge} aria-hidden="true" />
						</ExternalLink>
					</p>
					<p className="pb-2 text-center">
						Built: {buildDate}
					</p>
				</div>
			</label>
		</div>
	);
};

export default About;
