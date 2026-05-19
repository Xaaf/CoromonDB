export async function FlashedSkills({ coromon }: { coromon: any }) {
    return (
        <div>
            <h3 className="font-semibold mb-2">Skill Flash</h3>
            <p>Skill Flash table goes here...</p>
        </div>
    );
}

export async function LevelUpSkills({ coromon }: { coromon: any }) {
    return (
        <div>
            <h3 className="font-semibold mb-2">Level Up</h3>
            <p>Level Up table goes here...</p>
        </div>
    );
}

export default {
    FlashedSkills, LevelUpSkills
}