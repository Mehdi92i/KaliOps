import CvIntro from '@/components/cv/CvIntro';
import Separator from '@/components/Separator';
import CvExperiences from '@/components/cv/CvExperiences';
import CvSkills from '@/components/cv/CvSkills';
import CvTools from '@/components/cv/CvTools';
import CvLeisure from '@/components/cv/CvLeisure';
import CvTravels from '@/components/cv/CvTravels';

export default function Cv() {
    return (
        <div className="relative min-h-screen">
            {/* Arrière-plan dégradé couvrant toute la page */}
            <div className="fixed inset-0 -z-10 page-gradient" />

            {/* Contenu principal */}
            <div className="w-full max-w-screen-xl mx-auto px-6 lg:px-12 py-10">
                    <CvIntro />
                    <Separator />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <CvExperiences />
                        <div className="space-y-8">
                            <CvSkills />
                            <Separator />
                            <CvTools />
                            <Separator />
                            <CvLeisure />
                            <Separator />
                            <CvTravels />
                        </div>
                    </div>
                </div>
        </div>
    );
}
